export interface Skin {
	addHideBannerListener: ( hideBannerListener: () => void ) => void;
	removeEventListeners: () => void;
	minimumVisiblePageBeneathBanner: () => number;
}
