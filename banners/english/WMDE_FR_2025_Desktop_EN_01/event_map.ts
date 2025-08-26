import { TrackingEventConverterFactory } from '@src/tracking/LegacyTrackerWPORG';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { mapFormStepShownEvent } from '@src/tracking/LegacyEventTracking/mapFormStepShownEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { mapCloseEvent } from '@src/tracking/LegacyEventTracking/mapCloseEvent';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { mapNotShownEvent } from '@src/tracking/LegacyEventTracking/mapNotShownEvent';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { createViewportInfo } from '@src/tracking/LegacyEventTracking/createViewportInfo';
import { FallbackBannerSubmitEvent } from '@src/tracking/events/FallbackBannerSubmitEvent';
import { ShownEvent } from '@src/tracking/events/ShownEvent';
import { mapShownEvent } from '@src/tracking/LegacyEventTracking/mapShownEvent';

export default new Map<string, TrackingEventConverterFactory>( [
	[ ShownEvent.EVENT_NAME, mapShownEvent ],
	[ CloseEvent.EVENT_NAME, mapCloseEvent ],

	[ FormStepShownEvent.EVENT_NAME, mapFormStepShownEvent ],
	[ NotShownEvent.EVENT_NAME, mapNotShownEvent ],
	[ BannerSubmitEvent.EVENT_NAME, ( e: BannerSubmitEvent ): WMDESizeIssueEvent => {
		switch ( e.feature ) {
			case 'UpgradeToYearlyForm':
				return new WMDESizeIssueEvent( `submit-${e.userChoice}`, createViewportInfo(), 1 );
			default:
				return new WMDESizeIssueEvent( `submit`, createViewportInfo(), 1 );
		}
	} ],
	[ FallbackBannerSubmitEvent.EVENT_NAME, ( e: FallbackBannerSubmitEvent ): WMDESizeIssueEvent => new WMDESizeIssueEvent( e.eventName, createViewportInfo(), 1 ) ]
] );
