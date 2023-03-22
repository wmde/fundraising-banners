import { Page } from '@src/page/Page';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';

export class PageStub implements Page {
	public getBannerContainer(): string {
		return '';
	}

	public getReasonToNotShowBanner(): BannerNotShownReasons|null {
		return null;
	}

	public preventImpressionCountForHiddenBanner(): Page {
		return this;
	}

	public onPageEventThatShouldHideBanner(): void {
	}

	public removePageEventListeners(): Page {
		return this;
	}

	public setAnimated(): Page {
		return this;
	}

	public setSpace(): Page {
		return this;
	}

	public setTransitionDuration(): Page {
		return this;
	}

	public showBanner(): Page {
		return this;
	}

	public unsetAnimated(): Page {
		return this;
	}

	public setCloseCookieIfNecessary(): Page {
		return this;
	}

	public trackEvent(): void {
	}

}
