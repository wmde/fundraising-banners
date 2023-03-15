import { BannerEvent } from '@src/tracking/BannerEvent';

class CloseEvent implements BannerEvent {
	eventPrefix: string;
	bannerAction: string;
	eventRate: number;
	finalSlide: number;
	slidesShown: number;

	constructor( sourceOfCloseEvent: string, finalSlide: number = 0, slidesShown: number = 0 ) {
		this.bannerAction = 'close';
		this.eventPrefix = sourceOfCloseEvent;
		this.finalSlide = finalSlide;
		this.slidesShown = slidesShown;
	}
}
