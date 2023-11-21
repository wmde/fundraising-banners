import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class UpgradeToMonthlyEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'upgrade-to-monthly';

	public readonly eventName = UpgradeToMonthlyEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'UpgradeToMonthlyForm';
	public readonly userChoice: string;

	public constructor( userChoice: 'upgraded-to-monthly'|'not-upgraded-to-monthly' ) {
		this.userChoice = userChoice;
	}
}
