import { readdir, access } from 'fs/promises';
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

const channels = new Map<number, Channel>();
const campaigns = new Map<number, Campaign>();
const banners = new Map<number, Banner>();
const themes = new Map<number, Theme>();
const styleFiles = new Map<string, StyleFile>();

async function buildCampaigns( prefix: string, channel: Channel ): Promise<void> {
	const channelPath = path.join( prefix, channel.name );
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	const campaignsInDirectory = await readdir( channelPath );
	for ( const campaignName of campaignsInDirectory ) {
		// We could skip the 00 campaign here

		const campaign = new Campaign( campaigns.size + 1, campaignName, channel );
		const ctrlBanner = new Banner( banners.size + 1, 'ctrl', campaign );
		const varBanner = new Banner( banners.size + 1, 'var', campaign );
		campaign.banners.push( ctrlBanner, varBanner );
		campaigns.set( campaign.id, campaign );
		banners.set( ctrlBanner.id, ctrlBanner );
		banners.set( varBanner.id, varBanner );
		channel.campaigns.push( campaign );
	}
}

async function buildChannels( prefix: string ): Promise<void> {
	// eslint-disable-next-line security/detect-non-literal-fs-filename
	const channelsInDirectory = await readdir( prefix );
	for ( const channelName of channelsInDirectory ) {

		if ( channelName === 'thank_you' ) {
			continue;
		}
		const channel = new Channel( channels.size + 1, channelName );
		channels.set( channel.id, channel );
		await buildCampaigns( prefix, channel );
	}
}

async function buildStyleFiles( prefix: string ): Promise<void> {
	const styleFileIterator = globIterate( `${prefix}/**/*.scss` );
	const prefixDepth = prefix.split( path.sep ).length;
	let currentTheme = new Theme( 0, '' );
	let fileCounter = 1;
	for await ( const fn of styleFileIterator ) {
		const splitPath = fn.split( path.sep );
		splitPath.splice( 0, prefixDepth );
		const themeName = splitPath.shift();
		const themeRelativeFilePath = splitPath.join( path.sep );
		if ( themeName !== currentTheme.name ) {
			currentTheme = new Theme( themes.size + 1, themeName );
			themes.set( currentTheme.id, currentTheme );
		}
		const styleFile = new StyleFile( fileCounter++, themeRelativeFilePath, currentTheme );
		styleFiles.set( fn, styleFile );
	}
}

( async (): Promise<void> =>{
	await buildChannels( 'banners' );
	// console.log( Array.from( channels ) );
	await buildStyleFiles( 'src/themes' );
	console.log(styleFiles)
} )();
