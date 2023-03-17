import { Page } from '@src/page/Page';
import WPDE from '@src/page/skin/WPDE';
import { Skin } from '@src/page/skin/Skin';
import { CloseSources } from '@src/tracking/CloseSources';
import { BannerNotShownReasons } from './BannerNotShownReasons';

class PageDe implements Page {
	skin: Skin = new WPDE();

	getBannerContainer() {
		return '#WMDE-Banner-Container';
	}

	shouldShowBanner(): boolean {
		return true;
	}

	trackEvent(): void {
	}

	trackSizeIssue(): void {
	}

	onPageEventThatShouldHideBanner(): void {
	}

	setSpace(): Page {
		return this;
	}

	setAnimated(): Page {
		return this;
	}

	unsetAnimated(): Page {
		return this;
	}

	setTransitionDuration(): Page {
		return this;
	}

	showBanner(): Page {
		return this;
	}

	getReasonToNotShowBanner: () => BannerNotShownReasons;
	preventImpressionCountForHiddenBanner: () => void;
	setCloseCookieIfNecessary: ( source: CloseSources ) => void;

}

export default PageDe;
