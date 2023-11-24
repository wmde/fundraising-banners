import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class FallbackBannerSubmitEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'fallback-banner-submitted';

	public eventName: string = FallbackBannerSubmitEvent.EVENT_NAME;
	public customData: void;
	public feature: TrackingFeatureName = 'FallbackBanner';
	public userChoice: string = '';
}
