import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

export function newDynamicContent(): DynamicContent {
	return {
		campaignDaySentence: '',
		currentDate: '',
		getCurrentDateAndTime: () => '',
		currentDayName: '',
		daysLeftSentence: 'daysLeftSentence',
		donorsNeededSentence: '',
		goalDonationSum: '',
		overallImpressionCount: 0,
		progressBarContent: {
			percentageTowardsTarget: 42,
			donationTarget: 'donationTarget',
			amountDonated: 'amountDonated',
			amountNeeded: 'amountNeeded'
		},
		visitorsVsDonorsSentence: ''
	};
}
