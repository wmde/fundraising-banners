import { SizeIssue } from '@src/tracking/SizeIssue';
import { BannerEvent } from '@src/tracking/BannerEvent';
import { Skin } from '@src/page/skin/Skin';

export interface Page {
	skin: Skin;
	shouldShowBanner: () => boolean;
	trackSizeIssue: ( trackingData: SizeIssue ) => void;
	trackEvent: ( trackingData: BannerEvent ) => void;
	getBannerContainer: () => string;
	onPageEventThatShouldHideBanner: ( hideBannerListener: () => void ) => void;
	setSpace: ( space: number ) => Page;
	setTransitionDuration: ( duration: number ) => Page;
	setAnimated: () => Page;
	unsetAnimated: () => Page;
	showBanner: () => Page;
}
