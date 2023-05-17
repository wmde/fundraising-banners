import { CloseSources } from '@src/tracking/CloseSources';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';

export default new Map( [
	[ MobileMiniBannerExpandedEvent.EVENT_NAME, 1 ],
	[ CloseSources.SoftCloseBannerRejected, 0.1 ],
	[ CloseSources.MaybeLater, 0.1 ],
	[ CloseSources.TimeOut, 0.1 ]
	// TODO add more supported events (e.g. submit). We don't track SizeIssue events on WPDE
] );
