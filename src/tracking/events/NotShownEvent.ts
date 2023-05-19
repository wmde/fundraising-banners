import { TrackingEvent } from '@src/tracking/TrackingEvent';

export class NotShownEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'not-shown';

	public readonly eventName: string = NotShownEvent.EVENT_NAME;
	public readonly customData: Record<string, string|number>;
	public readonly feature: string = 'BannerConductor';
	public readonly userChoice: string = '';

	public constructor( customData: Record<string, string|number> = {} ) {
		this.customData = customData;
	}
}
