import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { DateAndTime } from '@src/utils/DynamicContent/DateAndTime';

export function newDynamicContent(): DynamicContent {
	return {
		campaignDaySentence: '',
		currentDate: '',
		getCurrentDateAndTime(): DateAndTime {
			return { currentDate: '', currentTime: '' };
		},
		currentDayName: '',
		daysLeftSentence: 'daysLeftSentence',
		daysPassedSentence: 'daysPassedSentence',
		donorsNeededSentence: '',
		goalDonationSum: '',
		remainingDonationSum: '',
		overallImpressionCount: 0,
		progressBarContent: {
			percentageTowardsTarget: 42,
			donationTarget: 'donationTarget',
			donationTargetAmount: 'donationTargetAmount',
			amountDonated: 'amountDonated',
			amountNeeded: 'amountNeeded',
			isLateProgress: false,
			dramaText: 'alarm!'
		},
		visitorsVsDonorsSentence: '',
		averageDonation: '',
		dramaText: 'alarm!'
	};
}
