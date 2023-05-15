import { EventData } from '@src/tracking/EventData';

export class BannerSubmitEvent implements EventData {
	public static readonly EVENT_NAME = 'submit';

	public readonly eventName = BannerSubmitEvent.EVENT_NAME;
	public readonly trackingRate = 0.01;

	public readonly eventFeature;
	public readonly customData: Record<string, string>;

	public constructor( eventFeature: string, customData: Record<string, string> = {} ) {
		this.eventFeature = eventFeature;
		this.customData = customData;
	}
}
