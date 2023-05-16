import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { CloseSources } from '@src/tracking/CloseSources';

export class CloseEvent implements TrackingEvent {
	public readonly eventName: string;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string = '';

	public constructor( source: CloseSources ) {
		this.eventName = source;
	}
}
