import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

/**
 * We emit this event on submit, when the user has chosen to cover the transaction fees.
 */
export class CoverTransactionFeesEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'cover-transaction-fee';

	public readonly eventName = CoverTransactionFeesEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'AlreadyDonatedModal';
	public readonly userChoice: string = '';
}
