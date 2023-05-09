import { EventData } from '@src/tracking/EventData';

export class MobileMiniBannerExpandedEvent implements EventData {

	public static readonly EVENT_NAME = 'mobile-mini-banner-expanded';

	public readonly eventName = MobileMiniBannerExpandedEvent.EVENT_NAME;

	public readonly trackingRate: number = 0.01;
}
