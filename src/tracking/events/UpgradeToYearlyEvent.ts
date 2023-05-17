import { TrackingEvent } from '@src/tracking/TrackingEvent';

export class UpgradeToYearlyEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'upgrade-to-yearly';

	public readonly eventName = UpgradeToYearlyEvent.EVENT_NAME;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string = 'UpgradeToYearlyForm';
	public readonly userInteraction: string;

	public constructor( userInteraction: 'upgraded-to-yearly'|'not-upgraded-to-yearly' ) {
		this.userInteraction = userInteraction;
	}
}
