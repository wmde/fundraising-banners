import { EventData } from '@src/tracking/EventData';

export class IncreaseCustomAmountEvent implements EventData {

	public static readonly EVENT_NAME = 'increased-amount';

	public readonly eventName = IncreaseCustomAmountEvent.EVENT_NAME;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string = 'CustomAmountForm';
}
