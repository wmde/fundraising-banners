import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class FormStepShownEvent implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'form-step-shown';

	public eventName = FormStepShownEvent.EVENT_NAME;
	public feature: TrackingFeatureName;
	public customData: void;
	public userChoice: string = '';

	public constructor( feature: TrackingFeatureName ) {
		this.feature = feature;
	}

}
