export interface EventData {
	/**
	 * Prefix for the banner name to have different events for the same banner
	 * (can't use bannerAction for that because it's a fixed enum that we don't control)
	 */
	bannerName: string,
	bannerAction: string,
	eventRate: number,
	slidesShown: number,
	finalSlide: number
}
