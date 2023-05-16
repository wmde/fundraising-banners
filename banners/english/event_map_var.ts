import CtrlEventMap from './event_map';
import { ClickAlreadyDonatedEvent } from '@src/tracking/events/ClickAlreadyDonatedEvent';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { CloseSources } from '@src/tracking/CloseSources';

// We "extend" the event map here because the original one is still in flux, and we want to avoid duplication
// At the next reset of this test, you should either throw away this map or combine the two maps in one file
CtrlEventMap.set( ClickAlreadyDonatedEvent.EVENT_NAME, ( e: ClickAlreadyDonatedEvent ): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( e.eventName, 1 ) );

CtrlEventMap.set(
	CloseSources.AlreadyDonatedGoAway, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed-already-donated', 0.1 )
);
CtrlEventMap.set(
	CloseSources.AlreadyDonatedMaybeLater, (): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( 'banner-closed-already-donated-maybelater', 0.1 )
);

export default CtrlEventMap;
