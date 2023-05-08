import { Tracker } from '@src/tracking/Tracker';
import { EventData } from '@src/tracking/EventData';
import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { WMDEBannerEvent } from '@src/tracking/WPORG/WMDEBannerEvent';

export type EventDataConverterFactory = ( event: EventData ) => WMDEBannerEvent|WMDESizeIssueEvent;

type EventNameMap = Map<string, EventDataConverterFactory>;

export class TrackerWPORG implements Tracker {
	private readonly _mediaWiki: MediaWiki;
	private readonly _bannerName: string;
	private readonly _supportedTrackingEvents: EventNameMap;

	public constructor( mediaWiki: MediaWiki, bannerName: string, supportedTrackingEvents: EventNameMap ) {
		this._mediaWiki = mediaWiki;
		this._bannerName = bannerName;
		this._supportedTrackingEvents = supportedTrackingEvents;
	}

	public trackEvent( event: EventData ): void {
		if ( !this._supportedTrackingEvents.has( event.eventName ) ) {
			return;
		}
		const wpOrgEvent = this._supportedTrackingEvents.get( event.eventName )( event );
		if ( this.isDevMode() || Math.random() > event.trackingRate ) {
			this._mediaWiki.track( wpOrgEvent.eventType, wpOrgEvent.getEventData( this._bannerName ) );
		}
	}

	private isDevMode(): boolean {
		const check = /devMode|devbanner/;
		return check.test( window.location.search );
	}

}
