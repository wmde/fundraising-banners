import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';

const notShownReasonToLegacyName = new Map<string, string>( [
	[ BannerNotShownReasons.SizeIssue, 'viewport_tracking' ],
	[ BannerNotShownReasons.DisallowedNamespace, 'namespace_tracking' ],
	[ BannerNotShownReasons.UserInteraction, 'user_interaction' ]
] );

export function mapNotShownEvent( notShownEvent: TrackingEvent ): WMDESizeIssueEvent {
	return new WMDESizeIssueEvent(
		notShownReasonToLegacyName.get( String( notShownEvent.customData.reason ) ),
		{
			viewportWidth: Number( notShownEvent.customData.viewportWidth ),
			viewportHeight: Number( notShownEvent.customData.viewportHeight ),
			bannerHeight: Number( notShownEvent.customData.bannerHeight )
		},
		1
	);
}
