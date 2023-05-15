import { Tracker } from '@src/tracking/Tracker';
import { EventData } from '@src/tracking/EventData';

export class TrackerSpy implements Tracker {

	private _receivedEvents: EventData[] = [];

	public trackEvent( trackingData: EventData ): void {
		this._receivedEvents.push( trackingData );
	}

	public hasTrackedEvent( eventName: string ): boolean {
		return this._receivedEvents.find( ( eventData: EventData ) => eventData.eventName === eventName ) !== undefined;
	}

	public getTrackedEvent( eventName: string ): EventData|null {
		return this._receivedEvents.find( ( eventData: EventData ) => eventData.eventName === eventName );
	}

}
