import { TrackingEventConverterFactory } from '@src/tracking/LegacyTrackerWPORG';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { createViewportInfo } from '@src/tracking/LegacyEventTracking/createViewportInfo';
import { ThankYouModalShownEvent } from '@src/tracking/events/ThankYouModalShownEvent';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { mapCloseEvent } from '@src/tracking/LegacyEventTracking/mapCloseEvent';

export default new Map<string, TrackingEventConverterFactory>( [
	[ CloseEvent.EVENT_NAME, mapCloseEvent ],
	[
		BannerSubmitEvent.EVENT_NAME,
		( e: BannerSubmitEvent ): WMDESizeIssueEvent => {
			return new WMDESizeIssueEvent( `submit-${e.userChoice}`, createViewportInfo(), 1 );
		}
	],
	[
		ThankYouModalShownEvent.EVENT_NAME,
		( e: ThankYouModalShownEvent ): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( e.eventName, 1 )
	]
] );
