import { Tracker } from '@src/tracking/Tracker';
import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';

type AllowedEventNames = Set<string>;

interface Window {
	[ key: string ]: any;
}
declare let window: Window;

export class TrackerWPDE implements Tracker {

	private readonly _trackerName: string;
	private readonly _bannerName: string;
	private readonly _supportedTrackingEvents: AllowedEventNames;
	private _trackFunction: ( eventName: 'Banner', actionName: string, bannerName: string ) => void;
	private _accumulatedTracking: Function[];
	private _scheduleRetry: Function;
	public trackerFindCounter: number;
	private _tracker: any;

	public constructor( trackerName: string, bannerName: string, supportedTrackingEvents: AllowedEventNames, scheduleRetry = scheduleRetryWithBackoff ) {
		this._trackerName = trackerName;
		this._bannerName = bannerName;
		this._supportedTrackingEvents = supportedTrackingEvents;
		this._trackFunction = (): void => {};
		this._tracker = null;
		this.trackerFindCounter = 0;
		this._accumulatedTracking = [];
		this._scheduleRetry = scheduleRetry;
		if ( !this.trackerLibraryIsLoaded( trackerName ) ) {
			scheduleRetry( this );
			return;
		}
		this._tracker = window[ this._trackerName ];
	}

	public waitForTrackerToInit(): void {
		if ( !this.trackerLibraryIsLoaded( this._trackerName ) ) {
			this.trackerFindCounter++;
			if ( this.trackerFindCounter < 10 ) {
				this._scheduleRetry( this );
			}
			return;
		}
		this._tracker = window[ this._trackerName ];
		this._accumulatedTracking.forEach( trackFn => trackFn( this._tracker ) );
		this._accumulatedTracking = [];
	}

	public trackEvent( event: TrackingEvent ): void {
		if ( !this._supportedTrackingEvents.has( event.eventName ) ) {
			return;
		}
		const eventName = this.getEventNameFromEvent( event );
		// TODO: Import event tracking rate from new map
		if ( this.isDevMode() || Math.random() > 1 ) {
			this.trackOrStore( ( tracker: any ): void => tracker.trackEvent( 'Banners', eventName, this._bannerName ) );
		}
	}

	private trackerLibraryIsLoaded( trackerName: string ): boolean {
		return typeof window[ trackerName ] !== 'undefined' && window[ trackerName ] !== null;
	}

	private isDevMode(): boolean {
		const check = /devMode|devbanner/;
		return check.test( window.location.search );
	}

	private trackOrStore( trackFn: Function ): void {
		if ( this._tracker === null ) {
			this._accumulatedTracking.push( trackFn );
			return;
		}
		trackFn();
	}

	/**
	 * Tracking on WPDE only knows event names and can't handle our complex banner events
	 * with action, feature, customData, etc. This method converts complex banner events
	 * into event names.
	 *
	 * Since we only have 2 channels on WPDE we decided to share the code.
	 *
	 * We should regularly clean up this method and remove unused events!
	 *
	 * @param {TrackingEvent} event
	 * @private
	 */
	private getEventNameFromEvent( event: TrackingEvent ): string {
		switch ( event.eventName ) {
			case CustomAmountChangedEvent.EVENT_NAME:
				return event.customData.amountChange + '-amount';
			default:
				return event.eventName;
		}
	}
}

function scheduleRetryWithBackoff( tracker: TrackerWPDE ): void {
	const RETRY_INTERVAL = 100;
	setTimeout(
		tracker.waitForTrackerToInit.bind( tracker ),
		Math.max( RETRY_INTERVAL, RETRY_INTERVAL * tracker.trackerFindCounter )
	);
}
