import { Integer } from '@src/utils/DynamicContent/formatters/Integer';
import { ThankYouCampaignParameters } from '@src/domain/CampaignParameters';

export interface ThankYouSettings {
	numberOfDonors: string;
	numberOfMembers: string;
	progressBarPercentage: number;
}

export function createThankYouSettings( formatter: Integer, campaignParameters: ThankYouCampaignParameters ): ThankYouSettings {
	return {
		numberOfDonors: formatter.format( campaignParameters.numberOfDonors ),
		numberOfMembers: formatter.format( campaignParameters.numberOfMembers ),
		progressBarPercentage: campaignParameters.progressBarPercentage
	};
}
