import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class UseOfFundsShownEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'use-of-funds-shown';

	public eventName: string = UseOfFundsShownEvent.EVENT_NAME;
	public customData: void;
	public feature: TrackingFeatureName;
	public userChoice: string = '';

	public constructor( feature: TrackingFeatureName ) {
		this.feature = feature;
	}
}
