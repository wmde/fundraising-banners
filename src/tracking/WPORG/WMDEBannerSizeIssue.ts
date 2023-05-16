import { SizeIssue } from '@src/page/MediaWiki/SizeIssue';

/**
 * @deprecated WMDESizeIssueEvent is for an old tracking schema
 */
export class WMDESizeIssueEvent {

	private readonly _eventName: string;
	private readonly _trackingRate: number;
	private readonly _bannerHeight: number;
	public readonly eventType = 'event.WMDEBannerSizeIssue';

	public constructor( eventName: string, bannerHeight: number, trackingRate: number = 0.01 ) {
		this._eventName = eventName;
		this._bannerHeight = bannerHeight;
		this._trackingRate = trackingRate;
	}

	public getEventData( bannerName: string ): SizeIssue {
		return {
			bannerName: this._eventName + '-' + bannerName,
			viewportWidth: window.innerWidth,
			viewportHeight: window.innerHeight,
			bannerHeight: this._bannerHeight,
			eventRate: this._trackingRate
		};
	}
}
