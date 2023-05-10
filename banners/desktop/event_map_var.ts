import CtrlEventMap from './event_map';
import { WMDEBannerEvent } from '@src/tracking/WPORG/WMDEBannerEvent';
import { AddressTypeFormPageShownEvent } from '@src/tracking/events/AddressTypeFormPageShownEvent';

// We "extend" the event map here because the original one is still in flux and we want to avoid duplication
// At the next reset of this test, you should either throw away this map or combine the two maps in one file
CtrlEventMap.set( AddressTypeFormPageShownEvent.EVENT_NAME,
	( e: AddressTypeFormPageShownEvent ): WMDEBannerEvent => new WMDEBannerEvent( e.eventName, e.trackingRate ) );

export default CtrlEventMap;
