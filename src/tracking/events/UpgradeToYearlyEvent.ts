import { EventData } from '@src/tracking/EventData';

export class UpgradeToYearlyEvent implements EventData {
	public static readonly EVENT_NAME = 'upgrade-to-yearly';

	public readonly eventName = UpgradeToYearlyEvent.EVENT_NAME;
	public readonly customData: Record<string, string>;
	public readonly feature: string = 'UpgradeToYearlyForm';

	public constructor( optionSelected: 'upgraded-to-yearly'|'not-upgraded-to-yearly' ) {
		this.customData = { optionSelected };
	}
}
