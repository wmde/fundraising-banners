import { EventData } from '@src/tracking/EventData';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';

export class NotShownEvent implements EventData {
	// TODO: Make these private and add getters
	public eventName: string;
	public trackingRate: number;

	public constructor( reason: BannerNotShownReasons, trackingRate: number = 1 ) {
		this.eventName = reason;
		this.trackingRate = trackingRate;
	}
}
