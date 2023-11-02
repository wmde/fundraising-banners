import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ShownEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'banner-shown';

	public readonly eventName: string = ShownEvent.EVENT_NAME;
	public readonly customData: Record<string, string|number> = {};
	public readonly feature: TrackingFeatureName = 'Page';
	public readonly userChoice: string = '';
}
