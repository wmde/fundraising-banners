import { EventDataConverterFactory } from '@src/tracking/LegacyTrackerWPORG';
import { CloseSources } from '@src/tracking/CloseSources';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { IncreaseCustomAmountEvent } from '@src/tracking/events/IncreaseCustomAmountEvent';
import { DecreaseCustomAmountEvent } from '@src/tracking/events/DecreaseCustomAmountEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { mapFormStepShownEvent } from '@src/tracking/LegacyEventTracking/mapFormStepShownEvent';

export default new Map<string, EventDataConverterFactory>( [
	[ CloseSources.MainBanner, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed', 0.1 ) ],
	[ CloseSources.AlreadyDonatedGoAway, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed', 0.1 ) ],
	[ BannerNotShownReasons.SizeIssue, ( e: NotShownEvent ): WMDESizeIssueEvent => new WMDESizeIssueEvent( '', Number( e.customData.bannerSize ), 1 ) ],
	[ FormStepShownEvent.EVENT_NAME, mapFormStepShownEvent ],
	[ IncreaseCustomAmountEvent.EVENT_NAME,
		( e: IncreaseCustomAmountEvent ): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( e.eventName, 1 ) ],
	[ DecreaseCustomAmountEvent.EVENT_NAME,
		( e: DecreaseCustomAmountEvent ): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( e.eventName, 1 ) ]
] );
