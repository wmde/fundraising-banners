import { ProgressBarContent } from '@src/utils/DynamicContent/generators/ProgressBarContent';

export interface DynamicContent {
	currentDayName: string;
	currentDate: string;
	daysLeftSentence: string;
	campaignDaySentence: string;
	visitorsVsDonorsSentence: string;
	donorsNeededSentence: string;
	goalDonationSum: string;
	overallImpressionCount: number;
	progressBarContent: ProgressBarContent;
}
