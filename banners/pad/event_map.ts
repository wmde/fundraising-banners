import { TrackingEventConverterFactory } from '@src/tracking/LegacyTrackerWPORG';
import { CloseSources } from '@src/tracking/CloseSources';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { ClickAlreadyDonatedEvent } from '@src/tracking/events/ClickAlreadyDonatedEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { mapFormStepShownEvent } from '@src/tracking/LegacyEventTracking/mapFormStepShownEvent';
import { mapSizeIssueEvent } from '@src/tracking/LegacyEventTracking/mapSizeIssueEvent';

export default new Map<string, TrackingEventConverterFactory>( [
	[ CloseSources.SoftCloseBannerRejected, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed', 0.1 ) ],
	[ CloseSources.MaybeLater, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed-maybelater', 0.1 ) ],
	[ CloseSources.TimeOut, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'micro-banner-ignored', 0.1 ) ],

	[ CloseSources.AlreadyDonatedGoAway, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed-already-donated', 0.1 ) ],
	[ CloseSources.AlreadyDonatedMaybeLater, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed-already-donated-maybelater', 0.1 ) ],

	[ ClickAlreadyDonatedEvent.EVENT_NAME, ( e: ClickAlreadyDonatedEvent ): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( e.eventName, 1 ) ],
	[ FormStepShownEvent.EVENT_NAME, mapFormStepShownEvent ],
	[ BannerNotShownReasons.SizeIssue, mapSizeIssueEvent ],
	[ BannerNotShownReasons.DisallowedNamespace, (): WMDESizeIssueEvent => new WMDESizeIssueEvent( 'namespace-tracking', null, 1 ) ]
	// TODO add more events
] );
