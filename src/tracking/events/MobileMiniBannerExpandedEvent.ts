import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

/**
 * Basic event that is fired when the initial Mini Banner on mobile is clicked + expanded to the Full Page Banner
 */
export class MobileMiniBannerExpandedEvent implements TrackingEvent<void> {

	public static readonly EVENT_NAME = 'mobile-mini-banner-expanded';

	public readonly eventName = MobileMiniBannerExpandedEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'MiniBanner';
	public readonly userChoice: string = '';

	public constructor( userChoice: string = '' ) {
		this.userChoice = userChoice;
	}
}
