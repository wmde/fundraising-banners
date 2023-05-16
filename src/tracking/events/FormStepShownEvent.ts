import { TrackingEvent } from '@src/tracking/TrackingEvent';

export class FormStepShownEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'form-step-shown';

	public readonly eventName = FormStepShownEvent.EVENT_NAME;
	public readonly feature: string;
	public readonly customData: Record<string, string> = {};

	public constructor( feature: string ) {
		this.feature = feature;
	}

}
