import { CampaignParameters } from '@src/domain/CampaignParameters';

export function getCampaignParameterOverride( campaignParameters: CampaignParameters ): CampaignParameters {
	// DO NOT OVERRIDE PARAMETERS IN PRODUCTION!
	return campaignParameters;
}
