/* eslint-disable camelcase */
import { TrackingParameters } from '@src/domain/TrackingParameters';

const FAQ_PAGE_URL = 'https://spenden.wikimedia.de/faq';

/**
 * This function is used to create a link to the FAQ page with tracking parameters.
 *
 * @param {TrackingParameters} tracking
 */
export function createFAQPageURL( tracking: TrackingParameters ): string {
	const urlParameters = new URLSearchParams( {
		piwik_kwd: tracking.keyword + '_faq',
		piwik_campaign: tracking.campaign
	} );

	return `${FAQ_PAGE_URL}?${urlParameters}`;
}
