import { EventDataConverterFactory } from '@src/tracking/TrackerWPORG';
import { CloseSources } from '@src/tracking/CloseSources';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { WMDEBannerEvent } from '@src/tracking/WPORG/WMDEBannerEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { UpgradeToYearlyFormPageShownEvent } from '@src/tracking/events/UpgradeToYearlyFormPageShownEvent';
import { CustomAmountFormPageShownEvent } from '@src/tracking/events/CustomAmountFormPageShownEvent';
import { IncreaseCustomAmountEvent } from '@src/tracking/events/IncreaseCustomAmountEvent';
import { DecreaseCustomAmountEvent } from '@src/tracking/events/DecreaseCustomAmountEvent';

export default new Map<string, EventDataConverterFactory>( [
	[ CloseSources.MainBanner, ( e: CloseEvent ): WMDEBannerEvent => new WMDEBannerEvent( 'banner-closed', e.trackingRate ) ],
	[ CloseSources.AlreadyDonatedGoAway, ( e: CloseEvent ): WMDEBannerEvent => new WMDEBannerEvent( 'banner-closed', e.trackingRate ) ],
	[ UpgradeToYearlyFormPageShownEvent.EVENT_NAME,
		( e: UpgradeToYearlyFormPageShownEvent ): WMDEBannerEvent => new WMDEBannerEvent( e.eventName, e.trackingRate ) ],
	[ CustomAmountFormPageShownEvent.EVENT_NAME,
		( e: CustomAmountFormPageShownEvent ): WMDEBannerEvent => new WMDEBannerEvent( e.eventName, e.trackingRate ) ],
	[ IncreaseCustomAmountEvent.EVENT_NAME,
		( e: IncreaseCustomAmountEvent ): WMDEBannerEvent => new WMDEBannerEvent( e.eventName, e.trackingRate ) ],
	[ DecreaseCustomAmountEvent.EVENT_NAME,
		( e: DecreaseCustomAmountEvent ): WMDEBannerEvent => new WMDEBannerEvent( e.eventName, e.trackingRate ) ],
	[ BannerNotShownReasons.SizeIssue, ( e: NotShownEvent ): WMDESizeIssueEvent => new WMDESizeIssueEvent( '', e.bannerSize, 1 ) ]
	// TODO add more events
] );
