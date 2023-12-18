import { Integer } from '@src/utils/DynamicContent/formatters/Integer';

const NUMBER_OF_DONORS = 345_123;
const PROGRESS_BAR_PERCENTAGE = 80;

export interface ThankYouSettings {
	numberOfDonors: string;
	progressBarPercentage: number;
}

export function createThankYouSettings( formatter: Integer ): ThankYouSettings {
	return {
		numberOfDonors: formatter.format( NUMBER_OF_DONORS ),
		progressBarPercentage: PROGRESS_BAR_PERCENTAGE
	};
}
