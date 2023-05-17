import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';

export class NotShownEvent implements TrackingEvent {
	public readonly eventName: string;
	public readonly customData: Record<string, string|number>;
	public readonly feature: string = 'BannerConductor';
	public readonly userInteraction: string = '';

	public constructor( reason: BannerNotShownReasons, customData: Record<string, string|number> = {} ) {
		this.eventName = reason;
		this.customData = customData;
	}
}
