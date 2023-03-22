import { CampaignParameters } from '@src/CampaignParameters';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { CloseSources } from '@src/tracking/CloseSources';
import { Tracker } from '@src/tracking/Tracker';
import { Vector2 } from '@src/utils/Vector2';

export interface Page extends Tracker {
	getReasonToNotShowBanner: ( bannerDimensions: Vector2 ) => BannerNotShownReasons|null;
	getBannerContainer: () => string;
	onPageEventThatShouldHideBanner: ( hideBannerListener: () => void ) => void;
	removePageEventListeners: () => Page;
	setSpace: ( space: number ) => Page;
	setTransitionDuration: ( duration: number ) => Page;
	setAnimated: () => Page;
	unsetAnimated: () => Page;
	showBanner: () => Page;
	preventImpressionCountForHiddenBanner: () => Page;
	setCloseCookieIfNecessary: ( source: CloseSources ) => Page;
	getCampaignParameters: () => CampaignParameters;
}
