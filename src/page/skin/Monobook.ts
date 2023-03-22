import { Skin } from '@src/page/skin/Skin';

class Monobook implements Skin {
	public addHideBannerListener: ( hideBannerListener: () => void ) => void;
	public removeEventListeners: () => void;
	public minimumVisiblePageBeneathBanner(): number {
		return 0;
	}
}

export default Monobook;
