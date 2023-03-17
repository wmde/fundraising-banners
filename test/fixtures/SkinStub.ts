import { Skin } from '@src/page/skin/Skin';

export class SkinStub implements Skin {
	addHideBannerListener(): void {
	}

	removeEventListeners(): void {
	}

	minimumVisiblePageBeneathBanner(): number {
		return 0;
	}

}
