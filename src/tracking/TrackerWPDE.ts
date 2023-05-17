import { Tracker } from '@src/tracking/Tracker';
import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';

type TrackingRatesForEvents = Map<string, number>;

interface Window {
	[ key: string ]: any;
}
declare let window: Window;

export class TrackerWPDE implements Tracker {

	private readonly _trackerName: string;
	private readonly _bannerName: string;
	private readonly _trackingRatesForEvents: TrackingRatesForEvents;
	private _preInitialisationEventQueue: Function[];
	private _trackerFindCounter: number;
	private _tracker: any;

	public constructor( trackerName: string, bannerName: string, trackingRatesForEvents: TrackingRatesForEvents ) {
		this._trackerName = trackerName;
		this._bannerName = bannerName;
		this._trackingRatesForEvents = trackingRatesForEvents;
		this._tracker = null;
		this._trackerFindCounter = 0;
		this._preInitialisationEventQueue = [];

		this.waitForTrackerToInit();
	}

	public waitForTrackerToInit(): void {
		if ( !this.trackerLibraryIsLoaded( this._trackerName ) ) {
			if ( this._trackerFindCounter < 10 ) {
				this._trackerFindCounter++;
				this.scheduleRetryWithBackoff();
			}
			return;
		}
		this._tracker = window[ this._trackerName ];
		this.trackItemsInEventQueue();
	}

	public trackEvent( event: TrackingEvent ): void {
		if ( !this._trackingRatesForEvents.has( event.eventName ) ) {
			return;
		}
		const eventName = this.getEventNameFromEvent( event );
		if ( this.isDevMode() || Math.random() <= this._trackingRatesForEvents.get( event.eventName ) ) {
			this.trackOrStore( ( tracker: any ): void => tracker.trackEvent( 'Banners', eventName, this._bannerName ) );
		}
	}

	private trackItemsInEventQueue(): void {
		this._preInitialisationEventQueue.forEach( trackFn => trackFn( this._tracker ) );
		this._preInitialisationEventQueue = [];
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
			this._preInitialisationEventQueue.push( trackFn );
			return;
		}
		trackFn( this._tracker );
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

	/**
	 * This makes the retry interval longer every time it is called
	 */
	private scheduleRetryWithBackoff(): void {
		const RETRY_INTERVAL = 100;
		setTimeout(
			this.waitForTrackerToInit.bind( this ),
			RETRY_INTERVAL * ( this._trackerFindCounter + 1 )
		);
	}
}
