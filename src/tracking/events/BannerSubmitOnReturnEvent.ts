import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

/**
 * This is used to track donors who've interacted with a banner, then seen another and
 * donated. We do this by storing the earlier close choice in local storage then retrieving
 * it when the banner form is submitted and fire this event.
 */
export class BannerSubmitOnReturnEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'submit-on-return';

	public eventName = BannerSubmitOnReturnEvent.EVENT_NAME;
	public feature: TrackingFeatureName;
	public userChoice: string;
	public customData: void;

	public constructor( userChoice: string = '' ) {
		this.userChoice = userChoice;
	}
}
