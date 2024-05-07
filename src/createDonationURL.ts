/* eslint-disable camelcase */
import { TrackingParameters } from '@src/domain/TrackingParameters';
import { ImpressionCount } from '@src/utils/ImpressionCount';

const DONATE_LINK_URL = 'https://spenden.wikimedia.de';

/**
 * This function is used when a component (other than a donation form submit button) is supposed to link directly
 * to the fundraising donation page and a URL with tracking information is needed for that.
 *
 * For creating the target URL for the banner donation form, see `createFormActions.ts` instead.
 *
 * @param {TrackingParameters} tracking
 * @param {ImpressionCount} impressionCount
 * @param {Record<string, string>} extraUrlParameters
 */
export function createDonationURL( tracking: TrackingParameters, impressionCount: ImpressionCount, extraUrlParameters: Record<string, string> = {} ): string {
	const urlParameters = new URLSearchParams( {
		piwik_kwd: tracking.keyword,
		piwik_campaign: tracking.campaign,
		impCount: String( impressionCount.overallCountIncremented ),
		bImpCount: String( impressionCount.bannerCountIncremented ),
		...extraUrlParameters
	} );

	return `${DONATE_LINK_URL}?${urlParameters}`;
}
