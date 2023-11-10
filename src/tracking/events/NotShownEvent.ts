import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class NotShownEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'not-shown';
	public static readonly DEFAULT_REASON = 'unknown-reason';

	public readonly eventName: string = NotShownEvent.EVENT_NAME;
	public readonly customData: Record<string, string|number>;
	public readonly feature: TrackingFeatureName = 'Page';
	public readonly userChoice: string = '';

	public constructor( customData: Record<string, string|number> = {} ) {
		this.customData = customData;
		this.customData.reason = customData.reason || NotShownEvent.DEFAULT_REASON;
	}
}
