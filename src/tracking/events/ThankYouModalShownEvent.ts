import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ThankYouModalShownEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'thank-you-modal-shown';

	public readonly eventName = ThankYouModalShownEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'ThankYouBanner';
	public readonly userChoice: string = '';
}
