import { EventData } from '@src/tracking/EventData';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';

export class NotShownEvent implements EventData {
	eventName: string;
	trackingRate: number;

	constructor( reason: BannerNotShownReasons, trackingRate: number = 1 ) {
		this.eventName = reason;
		this.trackingRate = trackingRate;
	}
}
