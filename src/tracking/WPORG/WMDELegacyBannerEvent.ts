import { LegacyBannerEvent } from '@src/page/MediaWiki/LegacyBannerEvent';

/**
 * @deprecated WMDELegacyBannerEvent is for an old tracking schema
 */
export class WMDELegacyBannerEvent {

	private readonly _eventName: string;
	private readonly _trackingRate: number;
	public readonly eventType = 'event.WMDEBannerEvents';
	public finalSlide = 0;
	public slidesShown = 0;

	public constructor( eventName: string, trackingRate: number = 0.01 ) {
		this._eventName = eventName;
		this._trackingRate = trackingRate;
	}

	public getEventData( bannerName: string ): LegacyBannerEvent {
		return {
			bannerName: bannerName,
			bannerAction: this._eventName + '-' + bannerName,
			eventRate: this._trackingRate,
			finalSlide: this.finalSlide,
			slidesShown: this.slidesShown
		};
	}
}
