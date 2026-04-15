import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ThankYouModalHiddenEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'thank-you-modal-hidden';

	public eventName = ThankYouModalHiddenEvent.EVENT_NAME;
	public customData: void;
	public feature: TrackingFeatureName = 'ThankYouBanner';
	public userChoice: string = '';
}
