import { Skin } from '@src/page/skin/Skin';

class Monobook implements Skin {
	addHideBannerListener: ( hideBannerListener: () => void ) => void;
	removeEventListeners: () => void;
	minimumVisiblePageBeneathBanner(): number {
		return 0;
	}
}

export default Monobook;
