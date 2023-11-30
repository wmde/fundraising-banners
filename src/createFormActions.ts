/* eslint-disable camelcase */
import { FormActions } from '@src/domain/FormActions';
import { TrackingParameters } from '@src/domain/TrackingParameters';
import { ImpressionCount } from '@src/utils/ImpressionCount';

const DONATE_WITH_ADDRESS_URL = 'https://spenden.wikimedia.de/donation/new';
const DONATE_ANONYMOUSLY_URL = 'https://spenden.wikimedia.de/donation/add';

/**
 * This function is used to create the form action (target URL) explicitly for the donation form submit on the banner.
 *
 * For creating a generic link (incl. tracking information) to the fundraising donation page, see `createDonationURL.ts`
 * @param {TrackingParameters} tracking
 * @param {ImpressionCount} impressionCount
 * @param {Record<string, string>} extraUrlParameters
 */
export function createFormActions( tracking: TrackingParameters, impressionCount: ImpressionCount, extraUrlParameters: Record<string, string> = {} ): FormActions {
	const urlParameters = new URLSearchParams( {
		piwik_kwd: tracking.keyword,
		piwik_campaign: tracking.campaign,
		banner_submission: '1',
		impCount: String( impressionCount.overallCountIncremented ),
		bImpCount: String( impressionCount.bannerCountIncremented ),
		...extraUrlParameters
	} );

	return {
		donateWithAddressAction: `${DONATE_WITH_ADDRESS_URL}?${urlParameters}`,
		donateAnonymouslyAction: `${DONATE_ANONYMOUSLY_URL}?${urlParameters}`
	};
}
