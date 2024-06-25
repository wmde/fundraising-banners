import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class BannerMinimisedEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'banner-minimised';

	public readonly eventName = BannerMinimisedEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'MinimisedBanner';
	public readonly userChoice: string = '';
}
