export interface DailyDonorStatsValues {
	currentDailyPercentage: number;
	averageDailyDonors: string;
	currentDonorsNeeded: string;
	currentDonorsSoFar: string;
}

export interface DailyDonorAverage {
	getDonorStatsForTime( time: Date ): DailyDonorStatsValues;
}
