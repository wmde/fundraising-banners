import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ReasonsToDonateShownEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'reasons-to-donate-shown';

	public readonly eventName: string = ReasonsToDonateShownEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName;
	public readonly userChoice: string = '';
}
