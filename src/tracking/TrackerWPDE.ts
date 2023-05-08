import { Tracker } from '@src/tracking/Tracker';
import { EventData } from '@src/tracking/EventData';

type AllowedEventNames = Set<string>;

export class TrackerWPDE implements Tracker {

	private readonly _trackerName: string;
	private readonly _bannerName: string;
	private readonly _supportedTrackingEvents: AllowedEventNames;
	private _trackFunction: ( eventName: 'Banner', actionName: string, bannerName: string ) => void;

	public constructor( trackerName: string, bannerName: string, supportedTrackingEvents: AllowedEventNames ) {
		this._trackerName = trackerName;
		this._bannerName = bannerName;
		this._supportedTrackingEvents = supportedTrackingEvents;
		this._trackFunction = (): void => {};
		// TODO implement logic from https://github.com/wmde/fundraising-banners-until-2022/blob/main/shared/matomo_tracker.js

		// TODO port the methods trackOrStore, trackerLibraryIsLoaded, waitForTrackerToInit from old code
	}

	public trackEvent( event: EventData ): void {
		if ( !this._supportedTrackingEvents.has( event.eventName ) ) {
			return;
		}
		if ( this.isDevMode() || Math.random() > event.trackingRate ) {
			this.trackOrStore( event.eventName );
		}
	}

	private isDevMode(): boolean {
		const check = /devMode|devbanner/;
		return check.test( window.location.search );
	}

	private trackOrStore( eventName: string ): void {
		// TODO check if track function was initialized
		this._trackFunction( 'Banner', eventName, this._bannerName );
	}
}
