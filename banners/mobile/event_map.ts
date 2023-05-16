import { TrackingEventConverterFactory } from '@src/tracking/LegacyTrackerWPORG';
import { CloseSources } from '@src/tracking/CloseSources';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { mapFormStepShownEvent } from '@src/tracking/LegacyEventTracking/mapFormStepShownEvent';

export default new Map<string, TrackingEventConverterFactory>( [
	[ CloseSources.SoftCloseBannerRejected, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed', 0.1 ) ],
	[ CloseSources.MaybeLater, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed-maybelater', 0.1 ) ],
	[ CloseSources.TimeOut, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'micro-banner-ignored', 0.1 ) ],
	[ CloseSources.FollowUpBanner, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed-full', 0.1 ) ],

	[ MobileMiniBannerExpandedEvent.EVENT_NAME,
		( e: MobileMiniBannerExpandedEvent ): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( e.eventName, 1 ) ],

	[ FormStepShownEvent.EVENT_NAME, mapFormStepShownEvent ],

	[ BannerNotShownReasons.SizeIssue, ( e: NotShownEvent ): WMDESizeIssueEvent => new WMDESizeIssueEvent( '', Number( e.customData.bannerSize ), 1 ) ],
	[ BannerNotShownReasons.DisallowedNamespace, (): WMDESizeIssueEvent => new WMDESizeIssueEvent( 'namespace-tracking', 0, 1 ) ]
	// TODO add more events
] );
