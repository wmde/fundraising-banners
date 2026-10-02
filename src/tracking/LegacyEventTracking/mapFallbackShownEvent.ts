import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import FallbackBannerShownEvent from '@src/tracking/events/FallbackBannerShownEvent';

export function mapFallbackShownEvent( shownEvent: FallbackBannerShownEvent ): WMDESizeIssueEvent|WMDELegacyBannerEvent {
	return new WMDESizeIssueEvent(
		'fallback-banner-shown',
		{
			viewportWidth: Number( shownEvent.customData.viewportWidth ),
			viewportHeight: Number( shownEvent.customData.viewportHeight ),
			bannerHeight: Number( shownEvent.customData.bannerHeight )
		},
		1
	);
}
