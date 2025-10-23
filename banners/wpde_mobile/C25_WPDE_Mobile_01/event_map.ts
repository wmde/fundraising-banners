import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { ShownEvent } from '@src/tracking/events/ShownEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';

export default new Map( [
	[ MobileMiniBannerExpandedEvent.EVENT_NAME, 1 ],
	[ CloseEvent.EVENT_NAME, 0.1 ],
	[ ShownEvent.EVENT_NAME, 1 ],
	[ FormStepShownEvent.EVENT_NAME, 1 ],
	[ BannerSubmitEvent.EVENT_NAME, 1 ]
] );
