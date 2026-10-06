import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';

/**
 * @deprecated Will be removed when the new tracking schema is implemented
 */
export function mapClickedDonateLinkEvent(): WMDELegacyBannerEvent {
	return new WMDELegacyBannerEvent( `clicked-donate-link`, 1 );
}
