import { Skin } from '@src/page/skin/Skin';

// TODO: This probably isn't needed as all skin manipulation can be handled by the parent page
class WPDE implements Skin {
	addHideBannerListener: ( hideBannerListener: () => void ) => void;
	removeEventListeners: () => void;
}

export default WPDE;
