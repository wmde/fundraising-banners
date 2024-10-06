import { Banner, Theme, StyleFile, DataModel } from './model';


class BannerFileCounts {
	public constructor(
		public readonly banner: Banner,
		public readonly themes: Map<Theme, number>
	) {}
}

interface StyleCountPerThemeRenderer {
	renderHeader(): void;
	renderChannel( channelName: string ): void;
	renderCampaign( campaignName: string, bannersHaveMatchingStyleFiles: boolean ): void;
	renderBannerFileCounts( counts: BannerFileCounts ): void;
	renderFooter(): void;
}

export class ConsoleStyleCountPerThemeRenderer implements StyleCountPerThemeRenderer {

	private currentCampaignName = '';
	private currentCampaignHasMatchingStyleFiles = false;
	private fileCountBuffer: BannerFileCounts[] = [];

	public constructor(
		private readonly specialThemeNamesToIgnore: string[] = [ 'UseOfFunds', 'Fijitiv' ]
	) {}

	public renderHeader(): void {}
	public renderChannel( channelName: string ): void {
		console.log( channelName );
	}
	public renderCampaign( campaignName: string, bannersHaveMatchingStyleFiles: boolean ): void {
		this.outputBuffer();
		this.currentCampaignName = campaignName;
		this.currentCampaignHasMatchingStyleFiles = bannersHaveMatchingStyleFiles;
	}
	public renderBannerFileCounts( counts: BannerFileCounts ): void {
		this.fileCountBuffer.push( counts );
	}
	public renderFooter(): void {
		this.outputBuffer();
	}

	private outputBuffer(): void {
		const fileCountBuffer = this.fileCountBuffer;
		let countLine: string;
		this.fileCountBuffer = [];
		if ( !this.currentCampaignName ) {
			return;
		}
		if ( this.currentCampaignHasMatchingStyleFiles ) {
			countLine = `(${this.renderThemeCounts( Array.from( fileCountBuffer[ 0 ].themes ) )})`;
		} else {
			countLine = fileCountBuffer.map( ( fileCount ) => {
				const themes = this.renderThemeCounts( Array.from( fileCount.themes ) );
				return `(${fileCount.banner.variant.toUpperCase()}: ${themes})`;
			} ).join( ' / ' );
		}
		console.log( `    ${this.currentCampaignName} ${countLine}` );
	}

	private renderThemeCounts( themes: Array<[Theme, number]> ): string {
		return themes.filter( ( [ theme ] ) => !this.specialThemeNamesToIgnore.includes( theme.name ) )
			.map( ( [ theme, count ] ) => `${theme.name}: ${count}` )
			.join( ', ' );
	}
}

class StyleCountsPerThemeReport {
	public constructor( private readonly renderer: StyleCountPerThemeRenderer ) {}

	public renderReport( datamodel: DataModel ): void {
		this.renderer.renderHeader();
		for ( const channel of Array.from( datamodel.channels.values() ) ) {
			this.renderer.renderChannel( channel.name );
			for ( const campaign of datamodel.getCampaignsById( channel.campaignIds ) ) {
				const banners = datamodel.getBannersById( campaign.bannerIds );
				this.renderer.renderCampaign( campaign.name, campaign.bannersHaveMatchingStyleFiles( banners ) );
				for ( const banner of banners ) {
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
