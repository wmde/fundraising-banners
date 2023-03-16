import { Skin } from '@src/page/skin/Skin';

class Vector2022 implements Skin {
	addHideBannerListener: ( hideBannerListener: () => void ) => void;
	removeEventListeners: () => void;
	minimumVisiblePageBeneathBanner(): number {
		return 160;
	}
}

export default Vector2022;
