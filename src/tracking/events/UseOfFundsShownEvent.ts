import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class UseOfFundsShownEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'use-of-funds-shown';

	public readonly eventName: string = UseOfFundsShownEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName;
	public readonly userChoice: string = '';

	public constructor( feature: TrackingFeatureName ) {
		this.feature = feature;
	}
}
