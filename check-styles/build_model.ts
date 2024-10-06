import { readdir, access, readFile } from 'fs/promises';
import * as path from 'path';
import { globIterate } from 'glob';
import { Channel, Campaign, Banner, Theme, StyleFile, BannerVariant, DataModel } from './model';

export class DataModelBuilder {
	private datamodel: DataModel;

	public async buildDataModel( bannerDirectory: string, themeDirectory: string ): Promise<DataModel> {
		this.datamodel = new DataModel();
		await this.buildChannels( bannerDirectory );
		await this.buildStyleFiles( themeDirectory );
		await this.linkStyleFilesWithBanners();
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

			const campaign = new Campaign( this.datamodel.getNextCampaignId(), campaignName, channel );
			const ctrlPath = await this.getStylePath( prefix, channel.name, campaignName, 'ctrl' );
			const varPath = await this.getStylePath( prefix, channel.name, campaignName, 'var' );
			const ctrlBanner = new Banner( this.datamodel.getNextBannerId(), 'ctrl', campaign, ctrlPath );
			const varBanner = new Banner( this.datamodel.getNextBannerId(), 'var', campaign, varPath );
			campaign.bannerIds.push( ctrlBanner.id, varBanner.id );
			this.datamodel.campaigns.set( campaign.id, campaign );
			this.datamodel.banners.set( ctrlBanner.id, ctrlBanner );
			this.datamodel.banners.set( varBanner.id, varBanner );
			channel.campaignIds.push( campaign.id );
		}
	}

	private async getStylePath( prefix: string, channelName: string, campaignName: string, variant: BannerVariant ): Promise<string> {
		const ctrlPath = path.join( prefix, channelName, campaignName, 'styles/styles.scss' );
		const varPath1 = path.join( prefix, channelName, campaignName, 'styles/styles_var.scss' );
		const varPath2 = path.join( prefix, channelName, campaignName, 'styles/stylesVar.scss' );
		const tryPaths = variant === 'ctrl' ? [ ctrlPath ] : [ varPath1, varPath2, ctrlPath ];
		for ( const stylePath of tryPaths ) {
			try {
				await access( stylePath );
				return stylePath;
			} catch {
				// just continue, no need to handle errors
			}
		}
		throw new Error( `File ${ctrlPath} not found - does the banner have a style file?` );
	}

	private async buildStyleFiles( themeDirectory: string ): Promise<void> {
		const styleFileIterator = globIterate( `${themeDirectory}/**/*.scss` );
		const themeDirectoryDepth = themeDirectory.split( path.sep ).length;
		const themeByName = new Map<string, Theme>();
		let currentTheme: Theme;
		let fileCounter = 1;
		for await ( const fn of styleFileIterator ) {
			const splitPath = fn.split( path.sep );
			splitPath.splice( 0, themeDirectoryDepth );
			const themeName = splitPath.shift();
			const themeRelativeFilePath = splitPath.join( path.sep );
			if ( themeByName.has( themeName ) ) {
				currentTheme = themeByName.get( themeName );
			} else {
				currentTheme = new Theme( this.datamodel.getNextThemeId(), themeName );
				this.datamodel.themes.set( currentTheme.id, currentTheme );
				themeByName.set( themeName, currentTheme );
			}
			const styleFile = new StyleFile( fileCounter++, themeRelativeFilePath, currentTheme );
			this.datamodel.styleFiles.set( fn, styleFile );
		}
	}

	private async linkStyleFilesWithBanners(): Promise<void> {
		const usePattern = /@use '@?(src\/themes\/[^'"]+)'/g;
		for ( const banner of Array.from( this.datamodel.banners.values() ) ) {
			// Reuse CTRL files for VAR banners that don't have a separate style file
			if ( banner.variant === 'var' && banner.campaign.bannersHaveMatchingStyleFiles ) {
				const ctrlBanner = this.datamodel.banners.get( banner.campaign.bannerIds[ 0 ] );
				const ctrlFiles = ctrlBanner.styleFiles;
				banner.styleFiles.splice( 0, 0, ...ctrlFiles );
				continue;
			}
			const styleFile = banner.styleFilePath;
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

