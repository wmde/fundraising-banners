import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { ThankYouModalShownEvent } from '@src/tracking/events/ThankYouModalShownEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';

export default new Map( [
	[ NotShownEvent.EVENT_NAME, 1 ],
	[ CloseEvent.EVENT_NAME, 0.1 ],
	[ ThankYouModalShownEvent.EVENT_NAME, 1 ],
	[ BannerSubmitEvent.EVENT_NAME, 1 ]
] );
