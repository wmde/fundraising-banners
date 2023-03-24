export interface DynamicContent {
	currentDayName: string;
	currentDate: string;
	daysLeftSentence: string;
	campaignDaySentence: string;
	visitorsVsDonorsSentence: string;
	donorsNeededSentence: string;
	goalDonationSum: string;
	overallImpressionCount: number;
	progressBarContent: {
		percentageTowardsTarget: number,
		donationTarget: string,
		amountDonated: string,
		amountNeeded: string
	};
}
