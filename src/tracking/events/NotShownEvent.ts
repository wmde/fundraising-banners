import { EventData } from '@src/tracking/EventData';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';

export class NotShownEvent implements EventData {
	// TODO: Make these private and add getters
	public eventName: string;
	public trackingRate: number;
	public bannerSize: number;

	public constructor( reason: BannerNotShownReasons, bannerSize: number, trackingRate: number = 1 ) {
		this.eventName = reason;
		this.bannerSize = bannerSize;
		this.trackingRate = trackingRate;
	}
}
