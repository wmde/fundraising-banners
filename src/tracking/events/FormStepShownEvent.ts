import { EventData } from '@src/tracking/EventData';

export class FormStepShownEvent implements EventData {
	public static readonly EVENT_NAME = 'decreased-amount';

	public readonly feature: string;
	public readonly eventName = FormStepShownEvent.EVENT_NAME;

	public constructor( feature: string ) {
		this.feature = feature;
	}

	public readonly trackingRate: number = 0.01;
}
