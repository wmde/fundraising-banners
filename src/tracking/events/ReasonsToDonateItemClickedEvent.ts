import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ReasonsToDonateItemClickedEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'reasons-to-donate-item-clicked';

	public readonly eventName: string = ReasonsToDonateItemClickedEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName;
	public readonly userChoice: string;

	public constructor( feature: TrackingFeatureName, userChoice: string ) {
		this.feature = feature;
		this.userChoice = userChoice;
	}
}
