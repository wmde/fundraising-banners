import { EventData } from '@src/tracking/EventData';
import { CloseSources } from '@src/tracking/CloseSources';

export class CloseEvent implements EventData {
	// TODO: Make these private and add getters
	public eventName: string;
	public trackingRate: number;

	public constructor( source: CloseSources, trackingRate = 0.01 ) {
		this.eventName = source;
		this.trackingRate = trackingRate;
	}
}
