import { Tracker } from '@src/tracking/Tracker';
import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { RuntimeEnvironment, UrlRuntimeEnvironment } from '@src/utils/RuntimeEnvironment';

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
	private _runtimeEnvironment: RuntimeEnvironment;

	public constructor( trackerName: string, bannerName: string, trackingRatesForEvents: TrackingRatesForEvents, runtimeEnvironment: RuntimeEnvironment | null = null ) {
		this._trackerName = trackerName;
		this._bannerName = bannerName;
		this._trackingRatesForEvents = trackingRatesForEvents;
		this._tracker = null;
		this._trackerFindCounter = 0;
		this._preInitialisationEventQueue = [];
		this._runtimeEnvironment = runtimeEnvironment ?? new UrlRuntimeEnvironment( window.location );

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

	public trackEvent( event: TrackingEvent<void> ): void {
		if ( !this._trackingRatesForEvents.has( event.eventName ) ) {
			return;
		}
		const eventName = this.getEventNameFromEvent( event );
		if ( this._runtimeEnvironment.isInDevMode || Math.random() <= this._trackingRatesForEvents.get( event.eventName ) ) {
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

	private trackOrStore( trackFn: Function ): void {
		if ( this._tracker === null ) {
			this._preInitialisationEventQueue.push( trackFn );
			return;
		}
		trackFn( this._tracker );
	}

	/**
	 * Tracking on WPDE only knows event names and can't handle our complex banner events
	 * with action, feature, userChoice, customData, etc. This method converts complex banner events
	 * into event names.
	 *
	 * Since we only have 2 channels on WPDE we decided to share the code.
	 *
	 * We should regularly clean up this method and remove unused events!
	 *
	 * @param {TrackingEvent} event
	 * @private
	 */
	private getEventNameFromEvent( event: TrackingEvent<void> ): string {
		switch ( event.eventName ) {
			case CustomAmountChangedEvent.EVENT_NAME:
				return event.userChoice + '-amount';
			case CloseEvent.EVENT_NAME:
				return 'banner-closed-' + event.userChoice;
			case FormStepShownEvent.EVENT_NAME:
				return event.eventName + '-' + event.feature;
			default:
				return event.eventName + ( event.userChoice !== '' ? '-' + event.userChoice : '' );
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
