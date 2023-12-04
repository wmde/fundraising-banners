import { DailyDonorAverage, DailyDonorStatsValues } from '@src/utils/DynamicContent/DailyDonorAverage';
import { Integer } from '@src/utils/DynamicContent/formatters/Integer';

const MINUTES_IN_DAY = 1440;

export class LinearDailyDonorAverage implements DailyDonorAverage {
	private readonly _averageDailyDonors: number;
	private readonly _integerFormatter: Integer;

	public constructor( averageDailyDonors: number, integerFormatter: Integer ) {
		this._averageDailyDonors = averageDailyDonors;
		this._integerFormatter = integerFormatter;
	}

	public getDonorStatsForTime( time: Date ): DailyDonorStatsValues {
		const percentage = ( ( time.getHours() * 60 ) + time.getMinutes() ) / MINUTES_IN_DAY;
		const cappedPercentage = Math.min( percentage, 0.9 );
		const donorsSoFar = this._averageDailyDonors * cappedPercentage;

		return {
			currentDailyPercentage: cappedPercentage,
			averageDailyDonors: this._integerFormatter.format( this._averageDailyDonors ),
			currentDonorsNeeded: this._integerFormatter.format( this._averageDailyDonors - donorsSoFar ),
			currentDonorsSoFar: this._integerFormatter.format( donorsSoFar )
		};
	}

}
