import { CloseSources } from '@src/tracking/CloseSources';
import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';

export default new Set( [
	CloseSources.MainBanner,
	CustomAmountChangedEvent.EVENT_NAME
	// TODO add more supported events (e.g. submit). We don't track SizeIssue events on WPDE
] );
