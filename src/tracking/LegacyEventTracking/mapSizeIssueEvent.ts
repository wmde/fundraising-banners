import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';

/**
 * @deprecated Will be removed when the new tracking schema is implemented
 */
export function mapSizeIssueEvent( e: NotShownEvent ): WMDESizeIssueEvent {
	return new WMDESizeIssueEvent(
		e.eventName,
		{
			bannerHeight: e.customData.bannerHeight as number,
			viewportHeight: e.customData.viewportHeight as number,
			viewportWidth: e.customData.viewportWidth as number
		},
		1
	);
}
