import { CloseSources } from '@src/tracking/CloseSources';
import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';

export default new Map( [
	[ CloseSources.MainBanner, 0.1 ],
	[ CustomAmountChangedEvent.EVENT_NAME, 1 ]
	// TODO add more supported events (e.g. submit). We don't track SizeIssue events on WPDE
] );
