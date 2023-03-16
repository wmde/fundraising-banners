import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';

export interface Page {
	getReasonToNotShowBanner: () => BannerNotShownReasons;
	getBannerContainer: () => string;
	onPageEventThatShouldHideBanner: ( hideBannerListener: () => void ) => void;
	setSpace: ( space: number ) => Page;
	setTransitionDuration: ( duration: number ) => Page;
	setAnimated: () => Page;
	unsetAnimated: () => Page;
	showBanner: () => Page;
	notifyThatBannerWasNotShown: () => void;
}
