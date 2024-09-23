import { readdir, access, readFile } from 'fs/promises';
import * as path from 'path';
import { globIterate } from 'glob';

type BannerVariant = 'ctrl'|'var';

class Theme {
	public constructor(
		public readonly id: number,
		public readonly name: string
	) {}
}
class StyleFile {
	public constructor(
		public readonly id: number,
		public readonly file: string,
		public readonly theme: Theme
	) {}

	public getPath(): string {
		return path.join( this.theme.name, this.file );
	}
}

class Channel {
	// eslint-disable-next-line no-use-before-define
	public readonly campaigns: Campaign[] = [];
	public constructor(
		public readonly id: number,
		public readonly name: string
	) {}
}

class Campaign {
	// eslint-disable-next-line no-use-before-define
	public readonly banners: Banner[] = [];
	public constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly channel: Channel
	) {
	}

	public async bannersHaveMatchingStyleFiles( prefix: string ): Promise<boolean> {
		if ( this.banners.length < 1 ) {
			throw new Error( `Campaign ${this.name} has no banners!` );
		}
		const ctrlPath = await this.banners[ 0 ].getStylePath( prefix );
		for ( let i = 1; i < this.banners.length; i++ ) {
			if ( await this.banners[ i ].getStylePath( prefix ) !== ctrlPath ) {
				return false;
			}
		}
		return true;
	}
}

class Banner {
	public readonly styleFiles: StyleFile[] = [];
	public constructor(
		public readonly id: number,
		public readonly variant: BannerVariant,
		public readonly campaign: Campaign
	) {}

	/**
	 * getStylePath
	 */
	public async getStylePath( prefix: string ): Promise<string> {
		const ctrlPath = path.join( prefix, this.campaign.channel.name, this.campaign.name, 'styles/styles.scss' );
		const varPath = path.join( prefix, this.campaign.channel.name, this.campaign.name, 'styles/styles_var.scss' );
		const tryPaths = this.variant === 'ctrl' ? [ ctrlPath ] : [ varPath, ctrlPath ];
		for ( const stylePath of tryPaths ) {
			try {
				await access( stylePath );
				return stylePath;
			} catch {
				// just continue, no need to hanndle errors
			}
		}
		throw new Error( `File ${ctrlPath} not found - does the banner have a style file?` );
	}
}

// Report classes

class BannerFileCounts {
	public constructor(
		public readonly banner: Banner,
		public readonly themes: Map<Theme, number>
	) {}
}

// Initialization functions

class DataModel {
	private channelId = 0;
	private campaignId = 0;
	private bannerId = 0;
	private themeId = 0;
	public readonly channels = new Map<number, Channel>();
	public readonly campaigns = new Map<number, Campaign>();
	public readonly banners = new Map<number, Banner>();
	public readonly themes = new Map<number, Theme>();
	public readonly styleFiles = new Map<string, StyleFile>();

	public getNextChannelId(): number {
		return this.channelId++;
	}

	public getNextCamapignId(): number {
		return this.campaignId++;
	}

	public getNextBannerId(): number {
		return this.bannerId++;
	}

	public getNextThemeId(): number {
		return this.themeId++;
	}
}

class DataModelBuilder {
	private datamodel: DataModel;

	public async buildDataModel( bannerDirectory: string, themeDirectory: string ): Promise<DataModel> {
		this.datamodel = new DataModel();
		await this.buildChannels( bannerDirectory );
		await this.buildStyleFiles( themeDirectory );
		await this.linkStyleFilesWithBanners( bannerDirectory );
		return this.datamodel;
	}

	private async buildChannels( prefix: string ): Promise<void> {
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		const channelsInDirectory = await readdir( prefix );
		for ( const channelName of channelsInDirectory ) {

			if ( channelName === 'thank_you' ) {
				continue;
			}
			const channel = new Channel( this.datamodel.getNextChannelId(), channelName );
			this.datamodel.channels.set( channel.id, channel );
			await this.buildCampaigns( prefix, channel );
		}
	}

	private async buildCampaigns( prefix: string, channel: Channel ): Promise<void> {
		const channelPath = path.join( prefix, channel.name );
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		const campaignsInDirectory = await readdir( channelPath );
		for ( const campaignName of campaignsInDirectory ) {
			// We could skip the 00 campaign here

			const campaign = new Campaign( this.datamodel.getNextCamapignId(), campaignName, channel );
			const ctrlBanner = new Banner( this.datamodel.getNextBannerId(), 'ctrl', campaign );
			const varBanner = new Banner( this.datamodel.getNextBannerId(), 'var', campaign );
			campaign.banners.push( ctrlBanner, varBanner );
			this.datamodel.campaigns.set( campaign.id, campaign );
			this.datamodel.banners.set( ctrlBanner.id, ctrlBanner );
			this.datamodel.banners.set( varBanner.id, varBanner );
			channel.campaigns.push( campaign );
		}
	}

	private async buildStyleFiles( themeDirectory: string ): Promise<void> {
		const styleFileIterator = globIterate( `${themeDirectory}/**/*.scss` );
		const themeDirectoryDepth = themeDirectory.split( path.sep ).length;
		let currentTheme = new Theme( 0, '' );
		let fileCounter = 1;
		for await ( const fn of styleFileIterator ) {
			const splitPath = fn.split( path.sep );
			splitPath.splice( 0, themeDirectoryDepth );
			const themeName = splitPath.shift();
			const themeRelativeFilePath = splitPath.join( path.sep );
			if ( themeName !== currentTheme.name ) {
				currentTheme = new Theme( this.datamodel.getNextThemeId(), themeName );
				this.datamodel.themes.set( currentTheme.id, currentTheme );
			}
			const styleFile = new StyleFile( fileCounter++, themeRelativeFilePath, currentTheme );
			this.datamodel.styleFiles.set( fn, styleFile );
		}
	}

	private async linkStyleFilesWithBanners( prefix: string ): Promise<void> {
		const usePattern = /@use '@?(src\/themes\/[^'"]+)'/g;
		for ( const banner of Array.from( this.datamodel.banners.values() ) ) {
			// Reuse CTRL files for VAR banners that don't have a separate style file
			if ( banner.variant === 'var' && banner.campaign.bannersHaveMatchingStyleFiles( prefix ) ) {
				const ctrlFiles = banner.campaign.banners[ 0 ].styleFiles;
				banner.styleFiles.splice( 0, 0, ...ctrlFiles );
				continue;
			}
			const styleFile = await banner.getStylePath( prefix );
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			const styleContent = await readFile( styleFile, 'utf8' );
			let result;
			while ( ( result = usePattern.exec( styleContent ) ) ) {
				const styleFileWithSuffix = result[ 1 ] + '.scss';
				if ( this.datamodel.styleFiles.has( styleFileWithSuffix ) ) {
					banner.styleFiles.push( this.datamodel.styleFiles.get( styleFileWithSuffix ) );
				} else {
					console.warn( `Banner ${banner.campaign.name} (${banner.variant}) tries to include ${styleFileWithSuffix} ` );
				}
			}
		}
	}

}

// Report classes

interface StyleCountPerThemeRenderer {
	renderHeader(): void;
	renderChannel( channelName: string ): void;
	renderCampaign( campaignName: string ): void;
	renderBannerFileCounts( counts: BannerFileCounts ): void;
	renderFooter(): void;
}

class ConsoleStyleCountPerThemeRenderer implements StyleCountPerThemeRenderer {

	public renderHeader(): void {}
	public renderChannel( channelName: string ): void {
		console.log( channelName );
	}
	public renderCampaign( campaignName: string ): void {
		console.log( campaignName );
	}
	public renderBannerFileCounts( counts: BannerFileCounts ): void {
		// TODO
	}
	public renderFooter(): void {
		// TODO
	}
}

class StyleCountsPerThemeReport {
	public constructor( private readonly renderer: StyleCountPerThemeRenderer ) {}

	public renderReport( datamodel: DataModel ): void {
		this.renderer.renderHeader();
		for ( const channel of Array.from( datamodel.channels.values() ) ) {
			this.renderer.renderChannel( channel.name );
			for ( const campaign of channel.campaigns ) {
				this.renderer.renderCampaign( campaign.name );
				for ( const banner of campaign.banners ) {
					this.renderer.renderBannerFileCounts( this.getStyleCountsPerTheme( banner ) );
				}
			}
		}
		this.renderer.renderFooter();
	}

	private getStyleCountsPerTheme( banner: Banner ): BannerFileCounts {
		const themeCounts = banner.styleFiles.reduce( ( counts: Map<Theme, number>, styleFile: StyleFile ): Map<Theme, number> => {
			const count = counts.get( styleFile.theme ) ?? 0;
			counts.set( styleFile.theme, count + 1 );
			return counts;
		}, new Map<Theme, number>() );
		return new BannerFileCounts( banner, themeCounts );
	}
}

( async (): Promise<void> =>{
	const builder = new DataModelBuilder();
	const model = await builder.buildDataModel( 'banners', 'src/themes' );
	const report = new StyleCountsPerThemeReport( new ConsoleStyleCountPerThemeRenderer() );
	report.renderReport( model );
} )();
