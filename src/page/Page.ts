import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import {CloseSources} from "@src/tracking/CloseSources";

export interface Page {
	getReasonToNotShowBanner: () => BannerNotShownReasons|null;
	getBannerContainer: () => string;
	onPageEventThatShouldHideBanner: ( hideBannerListener: () => void ) => void;
	setSpace: ( space: number ) => Page;
	setTransitionDuration: ( duration: number ) => Page;
	setAnimated: () => Page;
	unsetAnimated: () => Page;
	showBanner: () => Page;
	notifyThatBannerWasNotShown: () => void;
	notifyBannerWasClosed: ( source: CloseSources ) => void;
}
