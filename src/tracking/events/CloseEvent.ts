import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { CloseSources } from '@src/tracking/CloseSources';

export class CloseEvent implements TrackingEvent {
	public readonly eventName: string;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string = '';
	// TODO change interface from closeSource to eventname always "close", constructor with feature and userInteration
	public readonly userInteraction: string = '';

	public constructor( source: CloseSources ) {
		this.eventName = source;
	}
}
