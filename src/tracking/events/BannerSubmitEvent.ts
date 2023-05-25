import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class BannerSubmitEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'submit';

	public readonly eventName = BannerSubmitEvent.EVENT_NAME;
	public readonly feature: TrackingFeatureName;
	public readonly userChoice: string;
	public readonly customData: Record<string, string> = {};

	public constructor( feature: TrackingFeatureName, userChoice: string = '' ) {
		this.feature = feature;
		this.userChoice = userChoice;
	}
}
