import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { LegacyCloseSources } from '@src/tracking/LegacyCloseSources';
import { CloseChoices } from '@src/domain/CloseChoices';

// These are the close sources that the legacy tracking was interested in, we don't track other close sources
const closeSourceToLegacyEventName = new Map<string, string>( [
	[ LegacyCloseSources.AlreadyDonatedGoAway, 'banner-closed-already-donated' ],
	[ LegacyCloseSources.AlreadyDonatedMaybeLater, 'banner-closed-already-donated-maybelater' ],
	[ LegacyCloseSources.FullPageBanner, 'banner-closed-full' ],
	[ LegacyCloseSources.MaybeLater, 'banner-closed-maybelater' ],
	[ LegacyCloseSources.TimeOut, 'micro-banner-ignored' ]
] );

export function mapCloseEvent( event: CloseEvent ): WMDELegacyBannerEvent {
	if ( event.feature === 'AlreadyDonatedModal' ) {
		if ( event.userChoice === CloseChoices.NoMoreBannersForCampaign ) {
			return new WMDELegacyBannerEvent( closeSourceToLegacyEventName.get( LegacyCloseSources.AlreadyDonatedGoAway ), 0.1 );
		}

		if ( event.userChoice === CloseChoices.MaybeLater ) {
			return new WMDELegacyBannerEvent( closeSourceToLegacyEventName.get( LegacyCloseSources.AlreadyDonatedMaybeLater ), 0.1 );
		}
	}

	if ( event.feature === 'SoftClose' ) {
		if ( event.userChoice === CloseChoices.MaybeLater ) {
			return new WMDELegacyBannerEvent( closeSourceToLegacyEventName.get( LegacyCloseSources.MaybeLater ), 0.1 );
		}

		if ( event.userChoice === CloseChoices.TimeOut ) {
			return new WMDELegacyBannerEvent( closeSourceToLegacyEventName.get( LegacyCloseSources.TimeOut ), 0.1 );
		}
	}

	if ( event.feature === 'FullPageBanner' ) {
		return new WMDELegacyBannerEvent( closeSourceToLegacyEventName.get( LegacyCloseSources.FullPageBanner ), 0.1 );
	}

	return new WMDELegacyBannerEvent( 'banner-closed' );
}
