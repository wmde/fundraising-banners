import { Page } from '@src/page/Page';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { CloseSources } from '@src/tracking/CloseSources';

export class PageStub implements Page {
	getBannerContainer(): string {
		return '';
	}

	getReasonToNotShowBanner(): BannerNotShownReasons|null {
		return null;
	}

	onBannerWasNotShown(): void {
	}

	onPageEventThatShouldHideBanner(): void {
	}

	setAnimated(): Page {
		return this;
	}

	setSpace(): Page {
		return this;
	}

	setTransitionDuration(): Page {
		return this;
	}

	showBanner(): Page {
		return this;
	}

	unsetAnimated(): Page {
		return this;
	}

	setCloseCookieIfNecessary( source: CloseSources ): void {
	}

}
