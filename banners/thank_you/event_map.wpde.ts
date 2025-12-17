import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { ThankYouModalShownEvent } from '@src/tracking/events/ThankYouModalShownEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { ThankYouModalHiddenEvent } from '@src/tracking/events/ThankYouModalHiddenEvent';
import { ThankYouSectionExpandedEvent } from '@src/tracking/events/ThankYouSectionExpandedEvent';

export default new Map( [
	[ NotShownEvent.EVENT_NAME, 1 ],
	[ CloseEvent.EVENT_NAME, 0.1 ],
	[ ThankYouModalShownEvent.EVENT_NAME, 1 ],
	[ ThankYouModalHiddenEvent.EVENT_NAME, 1 ],
	[ ThankYouSectionExpandedEvent.EVENT_NAME, 1 ],
	[ BannerSubmitEvent.EVENT_NAME, 1 ]
] );
