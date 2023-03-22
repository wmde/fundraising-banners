import { Page } from '@src/page/Page';
import { BannerNotShownReasons } from './BannerNotShownReasons';

class PageDe implements Page {

	public getBannerContainer(): string {
		return '#WMDE-Banner-Container';
	}

	public shouldShowBanner(): boolean {
		return true;
	}

	public trackEvent(): void {
	}

	public trackSizeIssue(): void {
	}

	public onPageEventThatShouldHideBanner(): void {
	}

	public removePageEventListeners(): Page {
		return this;
	}

	public setSpace(): Page {
		return this;
	}

	public setAnimated(): Page {
		return this;
	}

	public unsetAnimated(): Page {
		return this;
	}

	public setTransitionDuration(): Page {
		return this;
	}

	public showBanner(): Page {
		return this;
	}

	public getReasonToNotShowBanner: () => BannerNotShownReasons;
	public preventImpressionCountForHiddenBanner: () => Page;
	public setCloseCookieIfNecessary(): Page {
		return this;
	}
}

export default PageDe;
