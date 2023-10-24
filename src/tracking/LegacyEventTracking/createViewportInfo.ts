import { ViewportAndBannerSize } from '@src/tracking/WPORG/WMDEBannerSizeIssue';

export function createViewportInfo(): ViewportAndBannerSize {
	return {
		bannerHeight: 0,
		viewportHeight: window.innerHeight,
		viewportWidth: window.innerWidth
	};
}
