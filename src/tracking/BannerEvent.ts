import { EventData } from '@src/tracking/EventData';
import { Page } from '@src/page/Page';

export interface BannerEvent {
	invoke( eventName: string ): void;
	invoke( eventName: string, data: EventData ): void;
}

export class MWBannerEvent implements BannerEvent {

	private page: Page;
	private bannerName: string;

	constructor( page: Page, bannerName: string ) {
		this.page = page;
		this.bannerName = bannerName;
	}

	invoke( eventName: string ): void;
	invoke( eventName: string, data: EventData ): void;
	invoke( eventName: string, data?: EventData ): void {

	}
}
