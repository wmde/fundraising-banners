import { EventDataConverterFactory } from '@src/tracking/TrackerWPORG';
import { CloseSources } from '@src/tracking/CloseSources';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { WMDEBannerEvent } from '@src/tracking/WPORG/WMDEBannerEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { IncreaseCustomAmountEvent } from '@src/tracking/events/IncreaseCustomAmountEvent';
import { DecreaseCustomAmountEvent } from '@src/tracking/events/DecreaseCustomAmountEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { mapFormStepShownEvent } from '@src/tracking/LegacyEventTracking/mapFormStepShownEvent';

export default new Map<string, EventDataConverterFactory>( [
	[ CloseSources.MainBanner, ( e: CloseEvent ): WMDEBannerEvent => new WMDEBannerEvent( 'banner-closed', e.trackingRate ) ],
	[ CloseSources.AlreadyDonatedGoAway, ( e: CloseEvent ): WMDEBannerEvent => new WMDEBannerEvent( 'banner-closed', e.trackingRate ) ],
	[ BannerNotShownReasons.SizeIssue, ( e: NotShownEvent ): WMDESizeIssueEvent => new WMDESizeIssueEvent( '', e.bannerSize, 1 ) ],
	[ FormStepShownEvent.EVENT_NAME, mapFormStepShownEvent ],
	[ IncreaseCustomAmountEvent.EVENT_NAME,
		( e: IncreaseCustomAmountEvent ): WMDEBannerEvent => new WMDEBannerEvent( e.eventName, e.trackingRate ) ],
	[ DecreaseCustomAmountEvent.EVENT_NAME,
		( e: DecreaseCustomAmountEvent ): WMDEBannerEvent => new WMDEBannerEvent( e.eventName, e.trackingRate ) ]
] );
