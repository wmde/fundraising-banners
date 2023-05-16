import CtrlEventMap from './event_map';
import { ClickAlreadyDonatedEvent } from '@src/tracking/events/ClickAlreadyDonatedEvent';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';

// We "extend" the event map here because the original one is still in flux, and we want to avoid duplication
// At the next reset of this test, you should either throw away this map or combine the two maps in one file
CtrlEventMap.set( ClickAlreadyDonatedEvent.EVENT_NAME, ( e: ClickAlreadyDonatedEvent ): WMDELegacyBannerEvent => new WMDELegacyBannerEvent( e.eventName, 1 ) );

export default CtrlEventMap;
