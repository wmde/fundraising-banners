import { EventData } from '@src/tracking/EventData';

export class IncreaseCustomAmountEvent implements EventData {

	public static readonly EVENT_NAME = 'increased-amount';

	public readonly eventName = IncreaseCustomAmountEvent.EVENT_NAME;

	public readonly trackingRate: number = 0.01;
}
