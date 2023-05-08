import { EventData } from '@src/tracking/EventData';

export class UpgradeToYearlyFormPageShownEvent implements EventData {
	public static readonly EVENT_NAME = 'upgrade-to-yearly-form-page-shown';

	public readonly eventName = UpgradeToYearlyFormPageShownEvent.EVENT_NAME;
	public readonly trackingRate = 0.01;
}
