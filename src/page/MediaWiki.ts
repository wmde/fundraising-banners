import { BannerEvent } from '@src/tracking/BannerEvent';
import { SizeIssue } from '@src/tracking/SizeIssue';

export interface MediaWiki {
	getConfigItem( name: string ): any;
	isShowingContentPage: () => boolean,
	isContentHiddenByLightbox: () => boolean,
	isInArticleNamespace: () => boolean,
	track: ( name: string, trackingData: BannerEvent|SizeIssue ) => void,
	preventBannerDisplayForPeriod: () => void,
	preventBannerDisplayUntilEndOfCampaign: () => void
}
