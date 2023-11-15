import { BannerNotShownReasons, isNotShownReason } from '@src/page/BannerNotShownReasons';
import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { WMDESizeIssueEvent } from '@src/tracking/WPORG/WMDEBannerSizeIssue';
import { WMDELegacyBannerEvent } from '@src/tracking/WPORG/WMDELegacyBannerEvent';
import { NotShownCustomData } from '@src/tracking/events/NotShownEvent';

const notShownReasonToLegacyName = new Map<BannerNotShownReasons, string>( [
	[ BannerNotShownReasons.SizeIssue, 'size_issue' ],
	[ BannerNotShownReasons.DisallowedNamespace, 'namespace_tracking' ],
	[ BannerNotShownReasons.UserInteraction, 'user_interaction' ]
] );

export const DEFAULT_UNKNOWN_EVENT = 'not-shown-for-unknown-reasons';

/**
 * @deprecated Will be removed when the new tracking schema is implemented
 */
export function mapNotShownEvent( notShownEvent: TrackingEvent<NotShownCustomData> ): WMDESizeIssueEvent|WMDELegacyBannerEvent {
	if ( notShownEvent.customData.reason === BannerNotShownReasons.SizeIssue ) {
		return new WMDESizeIssueEvent(
			notShownReasonToLegacyName.get( BannerNotShownReasons.SizeIssue ),
			{
				viewportWidth: Number( notShownEvent.customData.viewportWidth ),
				viewportHeight: Number( notShownEvent.customData.viewportHeight ),
				bannerHeight: Number( notShownEvent.customData.bannerHeight )
			},
			1
		);
	}
	// make sure we have an event name, even if we added a new entry to BannerNotShownReasons
	// or if we're accidentally processing another TrackingEvent or a NotShownEvent with missing reason here
	const reason = notShownEvent.customData.reason;
	const eventName = isNotShownReason( reason ) ? notShownReasonToLegacyName.get( reason ) : DEFAULT_UNKNOWN_EVENT;

	// We don't track other "not shown" events, hence the trackingRate of 0
	return new WMDELegacyBannerEvent( eventName, 0 );
}
