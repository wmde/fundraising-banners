import type { CampaignParameters } from '@src/domain/CampaignParameters';
import type { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import type { Vector2 } from '@src/utils/Vector2';
import type { TrackingParameters } from '@src/domain/TrackingParameters';
import type { TrackingEvent } from '@src/tracking/TrackingEvent';
import type { BannerCategory } from '@src/components/BannerConductor/BannerCategory';

export interface Page {
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
	setCloseCookieIfNecessary: ( closeEvent: TrackingEvent<void>, bannerCategory: BannerCategory ) => Page;
	getCampaignParameters: () => CampaignParameters;
	getTracking: () => TrackingParameters;
	setModalOpened: () => void;
	setModalClosed: () => void;
}
