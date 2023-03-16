import { EventData } from '@src/tracking/EventData';
import { CloseSources } from '@src/tracking/CloseSources';

export class CloseEvent implements EventData {
	eventName: string;
	trackingRate: number;

	constructor( source: CloseSources, trackingRate = 0.01 ) {
		this.eventName = source;
		this.trackingRate = trackingRate;
	}
}
