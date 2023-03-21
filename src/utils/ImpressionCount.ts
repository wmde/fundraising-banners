export interface ImpressionCount {
	getOverallCount: () => number;
	getBannerCount: () => number;
	incrementImpressionCounts: () => void;
}
