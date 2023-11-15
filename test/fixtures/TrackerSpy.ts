import { Tracker } from '@src/tracking/Tracker';
import { TrackingEvent } from '@src/tracking/TrackingEvent';

export class TrackerSpy implements Tracker {

	private _receivedEvents: TrackingEvent<any>[] = [];

	public trackEvent( trackingData: TrackingEvent<any> ): void {
		this._receivedEvents.push( trackingData );
	}

	public hasTrackedEvent( eventName: string ): boolean {
		return this._receivedEvents.find( ( eventData: TrackingEvent<any> ) => eventData.eventName === eventName ) !== undefined;
	}

	public getTrackedEvent( eventName: string ): TrackingEvent<any>|null {
		return this._receivedEvents.find( ( eventData: TrackingEvent<any> ) => eventData.eventName === eventName );
	}

}
