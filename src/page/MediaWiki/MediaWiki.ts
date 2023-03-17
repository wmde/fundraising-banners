import { BannerEvent } from '@src/page/MediaWiki/BannerEvent';
import { SizeIssue } from '@src/page/MediaWiki/SizeIssue';

export interface MediaWiki {
	getConfigItem( name: string ): any;
	isShowingContentPage: () => boolean;
	isContentHiddenByLightbox: () => boolean;
	isInArticleNamespace: () => boolean;
	track: ( name: string, trackingData: BannerEvent|SizeIssue ) => void;
	preventBannerDisplayForPeriod: () => void;
	preventBannerDisplayUntilEndOfCampaign: () => void;
}
