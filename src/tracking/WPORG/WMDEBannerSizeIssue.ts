import { SizeIssue } from '@src/page/MediaWiki/SizeIssue';

export interface ViewportAndBannerSize {
	viewportWidth: number;
	viewportHeight: number;
	bannerHeight: number;
}

/**
 * @deprecated WMDESizeIssueEvent is for an old tracking schema
 */
export class WMDESizeIssueEvent {

	private readonly _eventName: string;
	private readonly _trackingRate: number;
	private readonly _viewportInfo: ViewportAndBannerSize;
	public readonly eventType = 'event.WMDEBannerSizeIssue';

	public constructor( eventName: string, viewportInfo: ViewportAndBannerSize|null, trackingRate: number = 0.01 ) {
		this._eventName = eventName;
		this._viewportInfo = viewportInfo;
		this._trackingRate = trackingRate;
	}

	public getEventData( bannerName: string ): SizeIssue {
		const info = this._viewportInfo === null ? {
			viewportWidth: 0,
			viewportHeight: 0,
			bannerHeight: 0
		} : this._viewportInfo;
		return {
			bannerName: this._eventName + '-' + bannerName,
			eventRate: this._trackingRate,
			...info
		};
	}
}
