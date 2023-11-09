import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class AlreadyDonatedShownEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'already-donated-shown';

	public readonly eventName: string = AlreadyDonatedShownEvent.EVENT_NAME;
	public readonly customData: Record<string, string|number> = {};
	public readonly feature: TrackingFeatureName = 'AlreadyDonatedModal';
	public readonly userChoice: string = '';
}
