import { EventData } from '@src/tracking/EventData';

export class DecreaseCustomAmountEvent implements EventData {
	public static readonly EVENT_NAME = 'decreased-amount';

	public readonly eventName = DecreaseCustomAmountEvent.EVENT_NAME;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string = 'CustomAmountForm';
}
