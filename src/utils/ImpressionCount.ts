export interface ImpressionCount {
	overallCount: number;
	bannerCount: number;
	overallCountIncremented: number;

	// These values may not be reactive meaning they would be 0 on the first impression of a banner.
	// That means we need an interface to get the values incremented +1
	// Even though this value gets increased, the value will not be (reactively) updated in the banner text.
	// TODO research ways to make this reactive to not have to add 1 here manually
	bannerCountIncremented: number;
	incrementImpressionCounts: () => void;
}
