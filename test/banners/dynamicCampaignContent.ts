import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

export function newDynamicContent(): DynamicContent {
	return {
		campaignDaySentence: '',
		currentDate: '',
		getCurrentDateAndTime: () => '',
		getCurrentTime: () => '',
		currentDayName: '',
		daysLeftSentence: 'daysLeftSentence',
		donorsNeededSentence: '',
		goalDonationSum: '',
		overallImpressionCount: 0,
		progressBarContent: {
			percentageTowardsTarget: 42,
			donationTarget: 'donationTarget',
			donationTargetAmount: 'donationTargetAmount',
			amountDonated: 'amountDonated',
			amountNeeded: 'amountNeeded',
			isLateProgress: false
		},
		visitorsVsDonorsSentence: ''
	};
}
