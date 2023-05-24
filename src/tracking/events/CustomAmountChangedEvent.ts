import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class CustomAmountChangedEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'custom-amount-changed';

	public readonly eventName = CustomAmountChangedEvent.EVENT_NAME;
	public readonly customData: Record<string, string> = {};
	public readonly feature: TrackingFeatureName = 'CustomAmountForm';
	public readonly userChoice: string;

	public constructor( amountChange: 'increased' | 'decreased' ) {
		this.userChoice = amountChange;
	}
}
