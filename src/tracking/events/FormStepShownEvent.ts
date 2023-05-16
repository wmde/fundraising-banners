import { EventData } from '@src/tracking/EventData';

export class FormStepShownEvent implements EventData {
	public static readonly EVENT_NAME = 'decreased-amount';

	public readonly eventName = FormStepShownEvent.EVENT_NAME;
	public readonly feature: string;
	public readonly customData: Record<string, string> = {};

	public constructor( feature: string ) {
		this.feature = feature;
	}

}
