import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

/**
 * This event is fired _before_ the submit event when the user has minimised (and then maximized) the banner before donating.
 */
export class BannerBeforeSubmitWithMinimise implements TrackingEvent<void> {

	public static readonly EVENT_NAME = 'submit-after-minimise';

	public readonly eventName = BannerBeforeSubmitWithMinimise.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'MinimisedBanner';
	public readonly userChoice: string = '';
}
