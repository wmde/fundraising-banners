/**
 * @deprecated LegacyBannerEvent is for an old tracking schema
 *             Will be removed when the new tracking schema is implemented
 */
export interface LegacyBannerEvent {
	bannerName: string;
	bannerAction: string;
	eventRate: number;
	slidesShown: number;
	finalSlide: number;
}
