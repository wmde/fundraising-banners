import { CampaignParameters } from '@src/CampaignParameters';

export function getCampaignDataFromHtmlElement( selector: string ): CampaignParameters {

	const element = document.getElementById( selector );
	const data = element.dataset;

	if ( !element ) {
		throw new Error( 'Campaign data element not found' );
	}

	return {
		campaignProjection: {
			goalDonationSum: Number( data.goalDonationSum ),
			baseDate: data.donationsDateBase,
			baseDonationSum: Number( data.donationsCollectedBase ),
			donorsBase: Number( data.donorsBase ),
			donationAmountPerMinute: Number( data.donationsPerMinute ),
			donorsPerMinute: Number( data.donorsPerMinute ),
			averageAmountPerDonation: Number( data.averageAmountPerDonation )
		},
		millionImpressionsPerDay: Number( data.millionImpressionsPerDay ),
		startDate: data.campaignStartDate,
		endDate: data.campaignEndDate,
		numberOfMembers: Number( data.numberOfMembers )
	};

}
