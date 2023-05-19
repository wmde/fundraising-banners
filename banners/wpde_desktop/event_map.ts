import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';

export default new Map( [
	[ CloseEvent.EVENT_NAME, 0.1 ],
	[ CustomAmountChangedEvent.EVENT_NAME, 1 ]
	// TODO add more supported events (e.g. submit). We don't track SizeIssue events on WPDE
] );
