import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class MinimisedEvent implements TrackingEvent<void> {

	public static readonly EVENT_NAME = 'minimised';

	public readonly eventName = MinimisedEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName;
	public readonly userChoice: string = '';

	public constructor( feature: TrackingFeatureName, userChoice: string = '' ) {
		this.feature = feature;
		this.userChoice = userChoice;
	}
}
