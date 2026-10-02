import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export interface FallbackShownCustomData {
	bannerHeight: number;
	viewportWidth: number;
	viewportHeight: number;
}

export default class FallbackBannerShownEvent implements TrackingEvent<FallbackShownCustomData> {
	public static readonly EVENT_NAME = 'fallback-shown';

	public eventName: string = FallbackBannerShownEvent.EVENT_NAME;
	public customData: FallbackShownCustomData;
	public feature: TrackingFeatureName = 'Page';
	public userChoice: string = '';

	public constructor( customData: FallbackShownCustomData ) {
		this.customData = customData;
	}
}
