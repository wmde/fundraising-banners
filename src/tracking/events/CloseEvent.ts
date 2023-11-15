import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class CloseEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'close';

	public readonly eventName: string = CloseEvent.EVENT_NAME;
	public readonly customData: void;

	public constructor(
		public readonly feature: TrackingFeatureName = '',
		public readonly userChoice: string = ''
	) {
	}
}
