import { TrackingEventConverterFactory } from '@src/tracking/LegacyTrackerWPORG';
import { CloseSources } from '@src/tracking/CloseSources';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { mapFormStepShownEvent } from '@src/tracking/LegacyEventTracking/mapFormStepShownEvent';
import { CustomAmountChangedEvent } from '@src/tracking/events/CustomAmountChangedEvent';

export default new Map<string, TrackingEventConverterFactory>( [
	[ CloseSources.SoftCloseBannerRejected, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed', 0.1 ) ],
	[ CloseSources.MaybeLater, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed-maybelater', 0.1 ) ],
	[ CloseSources.TimeOut, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'micro-banner-ignored', 0.1 ) ],

	[ FormStepShownEvent.EVENT_NAME, mapFormStepShownEvent ],
	[ CustomAmountChangedEvent.EVENT_NAME,
		( e: CustomAmountChangedEvent ): WMDELegacyBannerEvent =>
			new WMDELegacyBannerEvent( e.customData.amountChange + '-amount', 1 )
	],

	[ BannerNotShownReasons.SizeIssue, ( e: NotShownEvent ): WMDESizeIssueEvent => new WMDESizeIssueEvent( '', Number( e.customData.bannerSize ), 1 ) ],
	[ BannerNotShownReasons.DisallowedNamespace, (): WMDESizeIssueEvent => new WMDESizeIssueEvent( 'namespace-tracking', 0, 1 ) ]
	// TODO add more events
] );
