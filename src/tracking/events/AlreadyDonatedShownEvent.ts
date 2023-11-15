import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class AlreadyDonatedShownEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'already-donated-shown';

	public readonly eventName: string = AlreadyDonatedShownEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'AlreadyDonatedModal';
	public readonly userChoice: string = '';
}
