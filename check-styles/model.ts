import * as path from 'path';

export type BannerVariant = 'ctrl'|'var';
export type ThemeId = number;
export type ChannelId = number;
export type CampaignId = number;
export type BannerId = number;
export type StyleFileId = number;

export class Theme {
	public constructor(
		public readonly id: ThemeId,
		public readonly name: string
	) {}
}

export class StyleFile {
	public constructor(
		public readonly id: StyleFileId,
		public readonly file: string,
		public readonly theme: Theme
	) {}

	public getPath(): string {
		return path.join( this.theme.name, this.file );
	}
}

export class Channel {
	public readonly campaignIds: CampaignId[] = [];
	public constructor(
		public readonly id: ChannelId,
		public readonly name: string
	) {}
}

export class Campaign {
	public readonly bannerIds: BannerId[] = [];
	public constructor(
		public readonly id: CampaignId,
		public readonly name: string,
		public readonly channel: Channel
	) {
	}

	public bannersHaveMatchingStyleFiles( bannerRepo: BannerRepository ): boolean {
		if ( this.bannerIds.length < 1 ) {
			throw new Error( `Campaign ${this.name} has no banners!` );
		}
		const banners = bannerRepo.getBannersById( this.bannerIds );
		const ctrlPath = banners[ 0 ].styleFilePath;
		for ( let i = 1; i < banners.length; i++ ) {
			if ( banners[ i ].styleFilePath !== ctrlPath ) {
				return false;
			}
		}
		return true;
	}
}

export class Banner {
	public readonly styleFiles: StyleFile[] = [];
	public constructor(
		public readonly id: number,
		public readonly variant: BannerVariant,
		public readonly campaign: Campaign,
		public readonly styleFilePath: string
	) {}

}

export interface BannerRepository {
	getBannersById( ids: BannerId[] ): Banner[];
}

export interface CampaignRepository {
	getCampaignsById( ids: CampaignId[] ): Campaign[];
}

/**
 * A simple, in-memory "database"
 */
export class DataModel implements BannerRepository, CampaignRepository {
	private channelId = 0;
	private campaignId = 0;
	private bannerId = 0;
	private themeId = 0;
	public readonly channels = new Map<ChannelId, Channel>();
	public readonly campaigns = new Map<CampaignId, Campaign>();
	public readonly banners = new Map<BannerId, Banner>();
	public readonly themes = new Map<ThemeId, Theme>();
	public readonly styleFiles = new Map<string, StyleFile>();

	public getNextChannelId(): ChannelId {
		return this.channelId++;
	}

	public getNextCampaignId(): CampaignId {
		return this.campaignId++;
	}

	public getNextBannerId(): BannerId {
		return this.bannerId++;
	}

	public getNextThemeId(): ThemeId {
		return this.themeId++;
	}

	public getBannersById( ids: BannerId[] ): Banner[] {
		return ids.map( ( id ) => this.banners.get( id ) );
	}

	public getCampaignsById( ids: CampaignId[] ): Campaign[] {
		return ids.map( ( id ) => this.campaigns.get( id ) );
	}
}


