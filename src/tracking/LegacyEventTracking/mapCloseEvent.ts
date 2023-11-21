import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';

export function mapCloseEvent( event: CloseEvent ): WMDELegacyBannerEvent {
	return new WMDELegacyBannerEvent( `banner-closed-${ event.feature }-${ event.userChoice }`, 0.1 );
}
