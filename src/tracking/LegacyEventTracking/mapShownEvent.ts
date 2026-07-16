import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import type { ShownEvent } from '@src/tracking/events/ShownEvent';
import { createViewportInfo } from '@src/tracking/LegacyEventTracking/createViewportInfo';

export function mapShownEvent( shownEvent: ShownEvent ): WMDESizeIssueEvent|WMDELegacyBannerEvent {
	if ( shownEvent.feature === 'FallbackBanner' ) {
		return new WMDESizeIssueEvent( 'fallback-banner-shown', createViewportInfo(), 1 );
	}

	return new WMDELegacyBannerEvent( 'banner-shown', 1 );
}
