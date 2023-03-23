import { CampaignParameters } from '@src/CampaignParameters';

export function getCampaignParameterOverride( campaignParameters: CampaignParameters ): CampaignParameters {
	// DO NOT OVERRIDE PARAMETERS IN PRODUCTION!
	return campaignParameters;
}
