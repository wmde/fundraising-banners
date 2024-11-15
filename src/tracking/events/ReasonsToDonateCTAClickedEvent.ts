import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ReasonsToDonateCTAClickedEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'reasons-to-donate-cta-clicked';

	public readonly eventName: string = ReasonsToDonateCTAClickedEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName;
	public readonly userChoice: string = '';
}
