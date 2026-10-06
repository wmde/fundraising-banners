import type { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';

export class ClickedDonateLink implements TrackingEvent<void> {
	public static readonly EVENT_NAME = 'clicked-donate-link';

	public eventName: string = ClickedDonateLink.EVENT_NAME;
	public customData: void;

	public constructor(
		public readonly feature: TrackingFeatureName = '',
		public readonly userChoice: string = ''
	) {
	}
}
