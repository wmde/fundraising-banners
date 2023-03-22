import { Skin } from '@src/page/skin/Skin';

class Vector2022 implements Skin {
	public addHideBannerListener: ( hideBannerListener: () => void ) => void;
	public removeEventListeners: () => void;
	public minimumVisiblePageBeneathBanner(): number {
		return 160;
	}
}

export default Vector2022;
