import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class BannerMaximisedEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'banner-maximised';

	public readonly eventName = BannerMaximisedEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'MinimisedBanner';
	public readonly userChoice: string;

	public constructor( userChoice: string ) {
		this.userChoice = userChoice;
	}

}
