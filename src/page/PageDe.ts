import { Page } from '@src/page/Page';
import WPDE from '@src/page/skin/WPDE';
import { Skin } from '@src/page/skin/Skin';
import { BannerNotShownReasons } from './BannerNotShownReasons';

class PageDe implements Page {
	skin: Skin = new WPDE();

	getBannerContainer(): string {
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

	removePageEventListeners(): Page {
		return this;
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
	preventImpressionCountForHiddenBanner: () => Page;
	setCloseCookieIfNecessary(): Page {
		return this;
	}
}

export default PageDe;
