import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ThankYouSectionExpandedEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'thank-you-section-expanded';

	public eventName = ThankYouSectionExpandedEvent.EVENT_NAME;
	public customData: void;
	public feature: TrackingFeatureName = 'ThankYouBanner';
	public userChoice: string = '';

	public constructor( userChoice: string = '' ) {
		this.userChoice = userChoice;
	}
}
