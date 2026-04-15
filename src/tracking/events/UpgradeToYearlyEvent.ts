import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class UpgradeToYearlyEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'upgrade-to-yearly';

	public eventName = UpgradeToYearlyEvent.EVENT_NAME;
	public customData: void;
	public feature: TrackingFeatureName = 'UpgradeToYearlyForm';
	public userChoice: string;

	public constructor( userChoice: 'upgraded-to-yearly'|'not-upgraded-to-yearly' ) {
		this.userChoice = userChoice;
	}
}
