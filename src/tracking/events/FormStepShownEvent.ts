import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class FormStepShownEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'form-step-shown';

	public readonly eventName = FormStepShownEvent.EVENT_NAME;
	public readonly feature: TrackingFeatureName;
	public readonly customData: Record<string, string> = {};
	public readonly userChoice: string = '';

	public constructor( feature: TrackingFeatureName ) {
		this.feature = feature;
	}

}
