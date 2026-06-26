import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ShownEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'banner-shown';

	public eventName: string = ShownEvent.EVENT_NAME;
	public customData: void;
	public feature: TrackingFeatureName;
	public userChoice: string = '';

	public constructor( feature: TrackingFeatureName ) {
		this.feature = feature;
	}
}
