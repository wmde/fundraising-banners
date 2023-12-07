/* eslint-disable camelcase */
import { TrackingParameters } from '@src/domain/TrackingParameters';
import { ImpressionCount } from '@src/utils/ImpressionCount';

const SUBSCRIBE_URL = 'https://www.wikimedia.de/mitglieder/';

export function createSubscribeURL( tracking: TrackingParameters, impressionCount: ImpressionCount ): string {
	const urlParameters = new URLSearchParams( {
		piwik_kwd: tracking.keyword,
		piwik_campaign: tracking.campaign,
		impCount: String( impressionCount.overallCountIncremented ),
		bImpCount: String( impressionCount.bannerCountIncremented )
	} );

	return `${SUBSCRIBE_URL}?${urlParameters}`;
}
