interface WMDEBannerEventData {
	bannerName: string;
	bannerAction: string;
	eventRate: number;
	finalSlide: number;
	slidesShown: number;
}

export class WMDEBannerEvent {

	private readonly _eventName: string;
	private readonly _trackingRate: number;
	public readonly eventType = 'event.WMDEBannerEvents';

	public constructor( eventName: string, trackingRate: number = 0.01 ) {
		this._eventName = eventName;
		this._trackingRate = trackingRate;
	}

	public getEventData( bannerName: string ): WMDEBannerEventData {
		return {
			bannerName: bannerName,
			bannerAction: this._eventName + '-' + bannerName,
			eventRate: this._trackingRate,
			finalSlide: 0,
			slidesShown: 0
		};
	}
}
