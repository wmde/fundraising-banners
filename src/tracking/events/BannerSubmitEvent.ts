import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class BannerSubmitEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'submit';

	public eventName = BannerSubmitEvent.EVENT_NAME;
	public feature: TrackingFeatureName;
	public userChoice: string;
	public customData: void;

	public constructor( feature: TrackingFeatureName, userChoice: string = '' ) {
		this.feature = feature;
		this.userChoice = userChoice;
	}
}
