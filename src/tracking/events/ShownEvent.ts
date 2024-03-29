import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ShownEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'banner-shown';

	public readonly eventName: string = ShownEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName;
	public readonly userChoice: string = '';

	public constructor( feature: TrackingFeatureName ) {
		this.feature = feature;
	}
}
