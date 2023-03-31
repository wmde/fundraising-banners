/* eslint-disable camelcase */
import { FormActions } from '@src/domain/FormActions';
import { TrackingParameters } from '@src/TrackingParameters';
import { ImpressionCount } from '@src/utils/ImpressionCount';

const DONATION_WITH_ADDRESS_URL = 'https://spenden.wikimedia.de/donation/new';
const DONATION_WITHOUT_ADDRESS_URL = 'https://spenden.wikimedia.de/donation/add';

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
		donateWithAddressAction: `${DONATION_WITH_ADDRESS_URL}?${urlParameters}`,
		donateWithoutAddressAction: `${DONATION_WITHOUT_ADDRESS_URL}?${urlParameters}`
	};
}
