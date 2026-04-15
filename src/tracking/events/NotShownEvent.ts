import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';
import type { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';

export interface NotShownCustomData {
	reason: BannerNotShownReasons;
	bannerHeight: number;
	viewportWidth: number;
	viewportHeight: number;
}

export class NotShownEvent implements TrackingEvent<NotShownCustomData> {
	public static readonly EVENT_NAME = 'not-shown';

	public eventName: string = NotShownEvent.EVENT_NAME;
	public customData: NotShownCustomData;
	public feature: TrackingFeatureName = 'Page';
	public userChoice: string = '';

	public constructor( customData: NotShownCustomData ) {
		this.customData = customData;
	}
}
