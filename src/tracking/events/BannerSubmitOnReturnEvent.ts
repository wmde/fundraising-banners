import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class BannerSubmitOnReturnEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'submit-on-return';

	public readonly eventName = BannerSubmitOnReturnEvent.EVENT_NAME;
	public readonly feature: TrackingFeatureName;
	public readonly userChoice: string;
	public readonly customData: void;

	public constructor( userChoice: string = '' ) {
		this.userChoice = userChoice;
	}
}
