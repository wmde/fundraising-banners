import { SizeIssue } from '@src/tracking/SizeIssue';
import { Skin } from '@src/page/skin/Skin';

export interface Page {
	skin: Skin;
	shouldShowBanner: () => boolean;
	trackSizeIssue: ( trackingData: SizeIssue ) => void;
	getBannerContainer: () => string;
	onPageEventThatShouldHideBanner: ( hideBannerListener: () => void ) => void;
	setSpace: ( space: number ) => Page;
	setTransitionDuration: ( duration: number ) => Page;
	setAnimated: () => Page;
	unsetAnimated: () => Page;
	showBanner: () => Page;
}
