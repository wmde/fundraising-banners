/* eslint-disable camelcase */
import { TrackingParameters } from '@src/domain/TrackingParameters';
import { ImpressionCount } from '@src/utils/ImpressionCount';

const DONATE_LINK_URL = 'https://spenden.wikimedia.de';

export function createFallbackDonationLink( tracking: TrackingParameters, impressionCount: ImpressionCount, extraUrlParameters: Record<string, string> = {} ): string {
	const urlParameters = new URLSearchParams( {
		piwik_kwd: tracking.keyword.replace( /(ctrl|var)/g, 'mini' ),
		piwik_campaign: tracking.campaign,
		impCount: String( impressionCount.overallCountIncremented ),
		bImpCount: String( impressionCount.bannerCountIncremented ),
		...extraUrlParameters
	} );

	return `${DONATE_LINK_URL}?${urlParameters}`;
}
