import CtrlEventMap from './event_map';
import { ClickAlreadyDonatedEvent } from '@src/tracking/events/ClickAlreadyDonatedEvent';
import { WMDEBannerEvent } from '@src/tracking/WPORG/WMDEBannerEvent';

// We "extend" the event map here because the original one is still in flux and we want to avoid duplication
// At the next reset of this test, you should either throw away this map or combine the two maps in one file
CtrlEventMap.set( ClickAlreadyDonatedEvent.EVENT_NAME, ( e: ClickAlreadyDonatedEvent ): WMDEBannerEvent => new WMDEBannerEvent( e.eventName, e.trackingRate ) );

export default CtrlEventMap;
