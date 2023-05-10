import { EventData } from '@src/tracking/EventData';

export class CustomAmountFormPageShownEvent implements EventData {
	public static readonly EVENT_NAME = 'custom-amount-form-page-shown';

	public readonly eventName = CustomAmountFormPageShownEvent.EVENT_NAME;
	public readonly trackingRate = 0.01;
}
