import { CloseSources } from '@src/tracking/CloseSources';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';

export default new Set( [
	CloseSources.MainBanner,
	MobileMiniBannerExpandedEvent.EVENT_NAME
	// TODO add more supported events (e.g. submit). We don't track SizeIssue events on WPDE
] );
