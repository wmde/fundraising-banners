import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { CloseSources } from '@src/tracking/CloseSources';

// These are the close sources that the legacy tracking was interested in, we don't track other close sources
const closeSourceToLegacyEventName = new Map<string, string>( [
	[ CloseSources.AlreadyDonatedGoAway, 'banner-closed-already-donated' ],
	[ CloseSources.AlreadyDonatedMaybeLater, 'banner-closed-already-donated-maybelater' ],
	[ CloseSources.FollowUpBanner, 'banner-closed-full' ],
	[ CloseSources.MainBanner, 'banner-closed' ],
	[ CloseSources.MaybeLater, 'banner-closed-maybelater' ],
	[ CloseSources.SoftCloseBannerRejected, 'banner-closed' ],
	[ CloseSources.TimeOut, 'micro-banner-ignored' ]
] );

export function mapCloseEvent( event: CloseEvent ): WMDELegacyBannerEvent {
	if ( !closeSourceToLegacyEventName.has( event.customData.closeSource ) ) {
		return new WMDELegacyBannerEvent( 'banner-closed' );
	}
	return new WMDELegacyBannerEvent( closeSourceToLegacyEventName.get( event.customData.closeSource ), 0.1 );
}
