/* eslint-disable camelcase */
import { TrackingParameters } from '@src/domain/TrackingParameters';
import { ImpressionCount } from '@src/utils/ImpressionCount';

export const SUBSCRIBE_URL = 'https://www.wikimedia.de/mitglieder/';
export const USE_OF_FUNDS_URL = 'https://spenden.wikimedia.de/use-of-funds/';
export const MEMBERSHIP_FORM_URL = 'https://spenden.wikimedia.de/apply-for-membership/';

export function createTrackedURL( url: string, tracking: TrackingParameters, impressionCount: ImpressionCount, extraUrlParameters: Record<string, string> = {} ): string {
	const urlParameters = new URLSearchParams( {
		piwik_kwd: tracking.keyword,
		piwik_campaign: tracking.campaign,
		impCount: String( impressionCount.overallCountIncremented ),
		bImpCount: String( impressionCount.bannerCountIncremented ),
		...extraUrlParameters
	} );

	return `${url}?${urlParameters}`;
}
