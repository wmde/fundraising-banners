import { TrackingEventConverterFactory } from '@src/tracking/LegacyTrackerWPORG';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { mapFormStepShownEvent } from '@src/tracking/LegacyEventTracking/mapFormStepShownEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { mapCloseEvent } from '@src/tracking/LegacyEventTracking/mapCloseEvent';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { mapNotShownEvent } from '@src/tracking/LegacyEventTracking/mapNotShownEvent';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';

export default new Map<string, TrackingEventConverterFactory>( [
	[ CloseEvent.EVENT_NAME, mapCloseEvent ],
	[ MobileMiniBannerExpandedEvent.EVENT_NAME,
		( e: MobileMiniBannerExpandedEvent ): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( e.eventName + ( e.userChoice !== '' ? `-${e.userChoice}` : '' ), 1 ) ],
	[ FormStepShownEvent.EVENT_NAME, mapFormStepShownEvent ],
	[ NotShownEvent.EVENT_NAME, mapNotShownEvent ],

	[ BannerSubmitEvent.EVENT_NAME, ( e: BannerSubmitEvent ): WMDESizeIssueEvent => {
		switch ( e.feature ) {
			case 'UpgradeToYearlyForm':
				return new WMDESizeIssueEvent( `submit-${e.userChoice}`, null, 1 );
			default:
				return new WMDESizeIssueEvent( `submit`, null, 1 );
		}
	} ]
] );
