import { Skin } from '@src/page/skin/Skin';

// TODO: This probably isn't needed as all skin manipulation can be handled by the parent page
class WPDE implements Skin {
	public addHideBannerListener: ( hideBannerListener: () => void ) => void;
	public removeEventListeners: () => void;
	public minimumVisiblePageBeneathBanner(): number {
		return 0;
	}
}

export default WPDE;
