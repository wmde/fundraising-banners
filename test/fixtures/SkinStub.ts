import { Skin } from '@src/page/skin/Skin';

export class SkinStub implements Skin {
	public addHideBannerListener(): void {
	}

	public removeEventListeners(): void {
	}

	public minimumVisiblePageBeneathBanner(): number {
		return 0;
	}

}
