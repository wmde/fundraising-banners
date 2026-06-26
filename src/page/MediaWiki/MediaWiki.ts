import type { LegacyBannerEvent } from '@src/page/MediaWiki/LegacyBannerEvent';
import type { SizeIssue } from '@src/page/MediaWiki/SizeIssue';
import type { BannerEvent } from '@src/page/MediaWiki/BannerEvent';
import type { BannerCategory } from '@src/components/BannerConductor/BannerCategory';

export interface MediaWiki {
	getConfigItem( name: string ): any;
	isShowingContentPage: () => boolean;
	isContentHiddenByLightbox: () => boolean;
	isInArticleNamespace: () => boolean;
	isShowingTemporaryAccountBar: () => boolean;
	track: ( name: string, trackingData: BannerEvent|LegacyBannerEvent|SizeIssue ) => void;
	preventBannerDisplayForPeriod: ( bannerCategory: BannerCategory ) => void;
	preventBannerDisplayUntilEndOfCampaign: ( bannerCategory: BannerCategory ) => void;
	preventBannerDisplayForHours: ( hours: number, bannerCategory: BannerCategory ) => void;
	setBannerLoadedButHidden: () => void;
}
