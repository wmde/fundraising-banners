import { Tracker } from '@src/tracking/Tracker';
import { EventData } from '@src/tracking/EventData';

// TODO define output type
type EventDataConverterFactory = ( e: EventData ) => any;

type EventNameMap = Map<string, EventDataConverterFactory>;

export class TrackerWPDE implements Tracker {

	private readonly _wpdeTracker: any;
	private readonly _bannerName: string;
	private readonly _supportedTrackingEvents: EventNameMap;

	// TODO implement wpdetracker
	public constructor( wpdeTracker: any, bannerName: string, supportedTrackingEvents: EventNameMap ) {
		this._wpdeTracker = wpdeTracker;
		this._bannerName = bannerName;
		this._supportedTrackingEvents = supportedTrackingEvents;
	}

	public trackEvent( event: EventData ): void {
		if ( !this._supportedTrackingEvents.has( event.eventName ) ) {
			return;
		}
		const wpDeEvent = this._supportedTrackingEvents.get( event.eventName )( event );
		if ( this.isDevMode() || Math.random() > event.trackingRate ) {
			this._wpdeTracker.sendData( wpDeEvent );
		}
	}

	private isDevMode(): boolean {
		const check = /devMode|devbanner/;
		return check.test( window.location.search );
	}

}
