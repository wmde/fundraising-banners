import { EventDataConverterFactory } from '@src/tracking/TrackerWPORG';
import { CloseSources } from '@src/tracking/CloseSources';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { WMDEBannerEvent } from '@src/tracking/WPORG/WMDEBannerEvent';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';

export default new Map<string, EventDataConverterFactory>( [
	[ CloseSources.MainBanner, ( e: CloseEvent ): WMDEBannerEvent => new WMDEBannerEvent( 'banner-closed', e.trackingRate ) ],
	[ CloseSources.AlreadyDonatedGoAway, ( e: CloseEvent ): WMDEBannerEvent => new WMDEBannerEvent( 'banner-closed', e.trackingRate ) ],
	[ BannerNotShownReasons.SizeIssue, ( e: NotShownEvent ): WMDESizeIssueEvent => new WMDESizeIssueEvent( '', e.bannerSize, 1 ) ],
	[ MobileMiniBannerExpandedEvent.EVENT_NAME,
		( e: MobileMiniBannerExpandedEvent ): WMDEBannerEvent => new WMDEBannerEvent( e.eventName, e.trackingRate ) ]
	// TODO add more events
] );
