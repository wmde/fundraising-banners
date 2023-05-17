import { TrackingEvent } from '@src/tracking/TrackingEvent';

export class MobileMiniBannerExpandedEvent implements TrackingEvent {

	public static readonly EVENT_NAME = 'mobile-mini-banner-expanded';

	public readonly eventName = MobileMiniBannerExpandedEvent.EVENT_NAME;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string = 'MiniBanner';
	public readonly userChoice: string = '';
}
