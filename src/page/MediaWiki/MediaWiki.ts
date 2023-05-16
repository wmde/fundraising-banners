import { LegacyBannerEvent } from '@src/page/MediaWiki/LegacyBannerEvent';
import { SizeIssue } from '@src/page/MediaWiki/SizeIssue';

export interface MediaWiki {
	getConfigItem( name: string ): any;
	isShowingContentPage: () => boolean;
	isContentHiddenByLightbox: () => boolean;
	isInArticleNamespace: () => boolean;
	track: ( name: string, trackingData: LegacyBannerEvent|SizeIssue ) => void;
	preventBannerDisplayForPeriod: () => void;
	preventBannerDisplayUntilEndOfCampaign: () => void;
	setBannerLoadedButHidden: () => void;
}
