import { TrackingEventConverterFactory } from '@src/tracking/LegacyTrackerWPORG';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { mapFormStepShownEvent } from '@src/tracking/LegacyEventTracking/mapFormStepShownEvent';
import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';
import { mapSizeIssueEvent } from '@src/tracking/LegacyEventTracking/mapSizeIssueEvent';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { mapCloseEvent } from '@src/tracking/LegacyEventTracking/mapCloseEvent';

export default new Map<string, TrackingEventConverterFactory>( [
	[ CloseEvent.EVENT_NAME, mapCloseEvent ],

	[ FormStepShownEvent.EVENT_NAME, mapFormStepShownEvent ],
	[ CustomAmountChangedEvent.EVENT_NAME,
		( e: CustomAmountChangedEvent ): WMDELegacyBannerEvent =>
			new WMDELegacyBannerEvent( e.customData.amountChange + '-amount', 1 )
	],
	[ BannerNotShownReasons.SizeIssue, mapSizeIssueEvent ],
	[ BannerNotShownReasons.DisallowedNamespace, (): WMDESizeIssueEvent =>
		new WMDESizeIssueEvent( 'namespace-tracking', null, 1 )
	],
	[ BannerSubmitEvent.EVENT_NAME, ( e: BannerSubmitEvent ): WMDESizeIssueEvent => {
		switch ( e.feature ) {
			case 'UpgradeToYearlyForm':
				return new WMDESizeIssueEvent( `submit-${e.customData.optionSelected}`, null, 1 );
			case 'CustomAmount':
				return new WMDESizeIssueEvent( `submit-different-amount`, null, 1 );
			default:
				return new WMDESizeIssueEvent( `submit`, null, 1 );
		}
	} ]
	// TODO add more events
] );
