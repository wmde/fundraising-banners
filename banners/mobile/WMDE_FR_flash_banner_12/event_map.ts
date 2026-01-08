import { TrackingEventConverterFactory } from '@src/tracking/LegacyTrackerWPORG';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { mapCloseEvent } from '@src/tracking/LegacyEventTracking/mapCloseEvent';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { mapNotShownEvent } from '@src/tracking/LegacyEventTracking/mapNotShownEvent';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { createViewportInfo } from '@src/tracking/LegacyEventTracking/createViewportInfo';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';

export default new Map<string, TrackingEventConverterFactory>( [
	[ CloseEvent.EVENT_NAME, mapCloseEvent ],
	[ NotShownEvent.EVENT_NAME, mapNotShownEvent ],
	[ BannerSubmitEvent.EVENT_NAME, ( e: BannerSubmitEvent ): WMDESizeIssueEvent => {
		return new WMDESizeIssueEvent( `submit-${e.userChoice}`, createViewportInfo(), 1 );
	} ],
	[ BannerSubmitOnReturnEvent.EVENT_NAME,
		( e: BannerSubmitOnReturnEvent ): WMDELegacyBannerEvent =>
			new WMDELegacyBannerEvent(
				e.eventName + ( e.userChoice !== '' ? `-${e.userChoice}` : '' ),
				1
			)
	],
	[ UseOfFundsShownEvent.EVENT_NAME,
		( e: UseOfFundsShownEvent ): WMDELegacyBannerEvent =>
			new WMDELegacyBannerEvent(
				e.eventName + ( e.userChoice !== '' ? `-${e.userChoice}` : '' ),
				1
			)
	]
] );
