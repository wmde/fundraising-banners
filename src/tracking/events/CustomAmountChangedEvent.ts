import { EventData } from '@src/tracking/EventData';

export class CustomAmountChangedEvent implements EventData {
	public static readonly EVENT_NAME = 'custom-amount-changed';

	public readonly eventName = CustomAmountChangedEvent.EVENT_NAME;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string = 'CustomAmountForm';

	public constructor( amountChange: 'increased' | 'decreased' ) {
		this.customData = { amountChange };
	}
}
