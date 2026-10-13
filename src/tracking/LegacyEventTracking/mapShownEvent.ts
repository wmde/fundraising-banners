import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';

export function mapShownEvent(): WMDELegacyBannerEvent {
	return new WMDELegacyBannerEvent( 'banner-shown', 1 );
}
