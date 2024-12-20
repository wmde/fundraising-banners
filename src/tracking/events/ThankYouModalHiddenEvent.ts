import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ThankYouModalHiddenEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'thank-you-modal-hidden';

	public readonly eventName = ThankYouModalHiddenEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'ThankYouBanner';
	public readonly userChoice: string = '';
}
