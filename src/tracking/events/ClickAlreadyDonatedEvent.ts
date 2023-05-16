import { EventData } from '@src/tracking/EventData';

export class ClickAlreadyDonatedEvent implements EventData {
	public static readonly EVENT_NAME = 'clicked-already-donated';

	public readonly eventName = ClickAlreadyDonatedEvent.EVENT_NAME;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string = 'AlreadyDonatedModal';
}
