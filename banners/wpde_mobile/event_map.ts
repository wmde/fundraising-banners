import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';

export default new Map( [
	[ MobileMiniBannerExpandedEvent.EVENT_NAME, 1 ],
	[ CloseEvent.EVENT_NAME, 0.1 ]
	// TODO add more supported events (e.g. submit). We don't track SizeIssue events on WPDE
] );
