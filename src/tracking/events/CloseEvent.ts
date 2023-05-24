import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class CloseEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'close';

	public readonly eventName: string = CloseEvent.EVENT_NAME;
	public readonly customData: Record<string, string> = {};

	public constructor(
		public readonly feature: TrackingFeatureName = '',
		public readonly userChoice: string = ''
	) {
	}
}
