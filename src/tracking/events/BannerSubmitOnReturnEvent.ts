import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

/**
 * This is used to track donors who've interacted with a banner, then seen another and
 * donated. We do this by storing the earlier close choice in local storage then retrieving
 * it when the banner form is submitted and fire this event.
 */
export class BannerSubmitOnReturnEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'submit-on-return';

	public readonly eventName = BannerSubmitOnReturnEvent.EVENT_NAME;
	public readonly feature: TrackingFeatureName;
	public readonly userChoice: string;
	public readonly customData: void;

	public constructor( userChoice: string = '' ) {
		this.userChoice = userChoice;
	}
}
