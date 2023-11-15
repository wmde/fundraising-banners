import { Tracker } from '@src/tracking/Tracker';
import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';

export type TrackingEventConverterFactory = ( event: TrackingEvent<any> ) => WMDELegacyBannerEvent|WMDESizeIssueEvent;

type EventNameMap = Map<string, TrackingEventConverterFactory>;

/**
 * @deprecated LegacyTrackerWPORG is for old tracking schemas
 *             It will be deleted when the new schema is implemented
 */
export class LegacyTrackerWPORG implements Tracker {
	private readonly _mediaWiki: MediaWiki;
	private readonly _bannerName: string;
	private readonly _supportedTrackingEvents: EventNameMap;

	public constructor( mediaWiki: MediaWiki, bannerName: string, supportedTrackingEvents: EventNameMap ) {
		this._mediaWiki = mediaWiki;
		this._bannerName = bannerName;
		this._supportedTrackingEvents = supportedTrackingEvents;
	}

	public trackEvent( event: TrackingEvent<void> ): void {
		if ( !this._supportedTrackingEvents.has( event.eventName ) ) {
			return;
		}
		const wpOrgEvent = this._supportedTrackingEvents.get( event.eventName )( event );
		const eventData = wpOrgEvent.getEventData( this._bannerName );
		if ( this.isDevMode() || Math.random() <= eventData.eventRate ) {
			this._mediaWiki.track( wpOrgEvent.eventType, eventData );
		}
	}

	private isDevMode(): boolean {
		const check = /devMode|devbanner/;
		return check.test( window.location.search );
	}

}
