import { CampaignParameters } from '@src/domain/CampaignParameters';

/**
 * Use this function to override the campaign parameters for local development (e.g. acceptance-testing dynamic text)
 *
 * You *must* import this function with the following import statement:
 *
 *    import { getCampaignParameterOverride } from '@environment/CampaignParameterOverride'
 *
 * Through the magic of webpack resolve.alias this file won't be included in the production build
 *
 * @file
 */

export function getCampaignParameterOverride( campaignParameters: CampaignParameters ): CampaignParameters {
	return {
		...campaignParameters,
		startDate: '2023-10-30',
		isLateProgress: true
	};
}
