import { Integer } from '@src/utils/DynamicContent/formatters/Integer';
import { ThankYouCampaignParameters } from '@src/domain/CampaignParameters';

export interface ThankYouSettings {
	numberOfDonors: string;
	progressBarPercentage: number;
}

export function createThankYouSettings( formatter: Integer, campaignParameters: ThankYouCampaignParameters ): ThankYouSettings {
	return {
		numberOfDonors: formatter.format( campaignParameters.numberOfDonors ),
		progressBarPercentage: campaignParameters.progressBarPercentage
	};
}
