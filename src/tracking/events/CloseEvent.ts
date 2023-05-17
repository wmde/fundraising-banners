import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { CloseSources } from '@src/tracking/CloseSources';

export class CloseEvent implements TrackingEvent {
	public static readonly EVENT_NAME = 'close';

	public readonly eventName: string = CloseEvent.EVENT_NAME;
	public readonly customData: Record<string, string> = {};
	public readonly feature: string;
	public readonly userChoice: string;

	public constructor( source: CloseSources ) {
		switch ( source ) {
			case CloseSources.AlreadyDonatedMaybeLater:
				this.feature = 'already-donated';
				this.userChoice = 'maybe-later';
				break;
			case CloseSources.AlreadyDonatedGoAway:
				this.feature = 'already-donated';
				this.userChoice = 'go-away';
				break;
			case CloseSources.FollowUpBanner:
				this.feature = 'follow-up-banner';
				this.userChoice = '';
				break;
			case CloseSources.MainBanner:
				this.feature = '';
				this.userChoice = '';
				break;
			case CloseSources.MaybeLater:
				this.feature = '';
				this.userChoice = 'maybe-later';
				break;
			case CloseSources.MiniBanner:
				this.feature = 'mini-banner';
				this.userChoice = '';
				break;
			case CloseSources.PageInteraction:
				this.feature = 'page-interaction';
				this.userChoice = '';
				break;
			case CloseSources.SoftCloseBannerRejected:
				this.feature = 'soft-close';
				this.userChoice = 'go-away';
				break;
			case CloseSources.TimeOut:
				this.feature = 'soft-close';
				this.userChoice = 'timeout';
				break;
		}
		// TODO remove the following line when we use the new event logging schema
		//      We only need it in the legacy TrackingEventConverterFactory implementations
		this.customData.closeSource = source;
	}
}
