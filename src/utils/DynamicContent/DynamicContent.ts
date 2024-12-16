import { DynamicProgressBarContent } from '@src/utils/DynamicContent/DynamicProgressBarContent';
import { DateAndTime } from '@src/utils/DynamicContent/DateAndTime';

/**
 * Properties in this interface are for items that are generated once and are then static after
 * Methods are for items that need to be updated per call
 */
export interface DynamicContent {
	currentDayName: string;
	currentDate: string;
	getCurrentDateAndTime: () => DateAndTime;
	daysLeftSentence: string;
	daysPassedSentence: string;
	campaignDaySentence: string;
	visitorsVsDonorsSentence: string;
	donorsNeededSentence: string;
	goalDonationSum: string;
	remainingDonationSum: string;
	overallImpressionCount: number;
	progressBarContent: DynamicProgressBarContent;
	averageDonation: string;
	dramaText: string;
}
