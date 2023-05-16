import { Tracker } from '@src/tracking/Tracker';
import { TrackingEvent } from '@src/tracking/TrackingEvent';

export class TrackerSpy implements Tracker {

	private _receivedEvents: TrackingEvent[] = [];

	public trackEvent( trackingData: TrackingEvent ): void {
		this._receivedEvents.push( trackingData );
	}

	public hasTrackedEvent( eventName: string ): boolean {
		return this._receivedEvents.find( ( eventData: TrackingEvent ) => eventData.eventName === eventName ) !== undefined;
	}

	public getTrackedEvent( eventName: string ): TrackingEvent|null {
		return this._receivedEvents.find( ( eventData: TrackingEvent ) => eventData.eventName === eventName );
	}

}
