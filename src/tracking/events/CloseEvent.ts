import { EventData } from '@src/tracking/EventData';
import { CloseSources } from '@src/tracking/CloseSources';

export class CloseEvent implements EventData {
	public readonly eventName: string;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string = '';

	public constructor( source: CloseSources ) {
		this.eventName = source;
	}
}
