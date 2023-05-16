import { CloseSources } from '@src/tracking/CloseSources';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';

export default new Set( [
	MobileMiniBannerExpandedEvent.EVENT_NAME,
	CloseSources.SoftCloseBannerRejected,
	CloseSources.MaybeLater,
	CloseSources.TimeOut
	// TODO add more supported events (e.g. submit). We don't track SizeIssue events on WPDE
] );
