import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ThankYouModalShownEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'thank-you-modal-shown';

	public eventName = ThankYouModalShownEvent.EVENT_NAME;
	public customData: void;
	public feature: TrackingFeatureName = 'ThankYouBanner';
	public userChoice: string = '';
}
