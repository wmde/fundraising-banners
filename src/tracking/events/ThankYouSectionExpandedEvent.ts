import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ThankYouSectionExpandedEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'thank-you-section-expanded';

	public readonly eventName = ThankYouSectionExpandedEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'ThankYouBanner';
	public readonly userChoice: string = '';

	public constructor( userChoice: string = '' ) {
		this.userChoice = userChoice;
	}
}
