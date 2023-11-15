import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class UpgradeToYearlyEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'upgrade-to-yearly';

	public readonly eventName = UpgradeToYearlyEvent.EVENT_NAME;
	public readonly customData: void;
	public readonly feature: TrackingFeatureName = 'UpgradeToYearlyForm';
	public readonly userChoice: string;

	public constructor( userChoice: 'upgraded-to-yearly'|'not-upgraded-to-yearly' ) {
		this.userChoice = userChoice;
	}
}
