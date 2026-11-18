import type { CampaignParameters } from '@src/domain/CampaignParameters';
import type { Formatters } from '@src/utils/DynamicContent/Formatters';
import TimeRange from '@src/utils/TimeRange';

const campaignTarget2025 = 8000000;

/**
 * This contains the amount total we had on each day of the
 * 2025 campaign so we can compare it to the 2026 one.
 */
const dailyAmounts2025 = [
	393369.82,
	671787.44,
	1011636.83,
	1253823.97,
	1465610.39,
	1674084.66,
	1819122.74,
	1969650.18,
	2241982.91,
	2454091.95,
	2609338.13,
	2753564.89,
	2888489.46,
	2976913.14,
	3085866.3,
	3269049.02,
	3422288.74,
	3552596.05,
	3667520.54,
	3780343.79,
	3855612.63,
	4135208.11,
	4384991.51,
	4565713.77,
	4707251.68,
	4818866.41,
	4919936.58,
	4987082.39,
	5065720.96,
	5213081.97,
	5329289.61,
	5423178.03,
	5514179.79,
	5612438.64,
	5669391.34,
	5742418.3,
	5919938.82,
	6055890.28,
	6176155.09,
	6284214.27,
	6394965.86,
	6465809.77,
	6750801.24,
	7027373.05,
	7209623.8,
	7342874.27,
	7461461.69,
	7568967.01,
	7641453.58,
	7724924.73,
	7908286.47,
	8033523.69
];

export interface DailyAmounts {
	formattedDifference: ( currentAmountInCents: number ) => string;
	progressPercentage: number;
}

export default class DailyAmounts2025 implements DailyAmounts {
	private readonly _date: Date;
	private _campaignParameters: CampaignParameters;
	private _formatters: Formatters;
	private _campaignTimeRange: TimeRange;

	public constructor(
		date: Date,
		campaignParameters: CampaignParameters,
		formatters: Formatters
	) {
		this._date = date;
		this._campaignParameters = campaignParameters;
		this._formatters = formatters;

		this._campaignTimeRange = TimeRange.createFromStrings(
			this._campaignParameters.startDate,
			this._campaignParameters.endDate,
			this._date
		);
	}

	private dailyAmount(): number {
		return dailyAmounts2025[ this._campaignTimeRange.daysSinceStart() - 1 ] ?? campaignTarget2025;
	}

	public formattedDifference( currentAmount: number ): string {
		return this._formatters.currency.millions( this.dailyAmount() - currentAmount );
	}

	public get progressPercentage(): number {
		const percentage = this.dailyAmount() / campaignTarget2025;
		return Math.min( percentage * 100, 100 );
	}
}
