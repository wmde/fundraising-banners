import { CampaignProjectionParameters } from '@src/CampaignParameters';
import TimeRange from '@src/utils/TimeRange';

const DONORS_NEEDED_ROUNDING = 100_000;

/**
 * This class projects the figures from the last updated date to the current date
 * in order to get a more accurate representation of where the campaign currently stands
 *
 * We update campaign figures manually every few days, which is why this class is needed
 */
export class CampaignProjection {
	private readonly _campaignProjectionParameters: CampaignProjectionParameters;
	private readonly _timeRange: TimeRange;

	public constructor( campaignProjectionParameters: CampaignProjectionParameters, timeRange: TimeRange ) {
		this._campaignProjectionParameters = campaignProjectionParameters;
		this._timeRange = timeRange;
	}

	public projectedDonationCount(): number {
		return this.calculateProjection(
			this._campaignProjectionParameters.donationCountBase,
			this._campaignProjectionParameters.donationCountPerMinute
		);
	}

	public remainingNumberOfDonationsNeeded(): number {
		return Math.round( this.projectedRemainingDonationSum() / this._campaignProjectionParameters.averageAmountPerDonation );
	}

	public projectedDonationSum(): number {
		return this.calculateProjection(
			this._campaignProjectionParameters.donationSumBase,
			this._campaignProjectionParameters.donationAmountPerMinute
		);
	}

	private projectedRemainingDonationSum(): number {
		const remainingAmount = this._campaignProjectionParameters.donationTarget - this.projectedDonationSum();
		return Math.round( remainingAmount / DONORS_NEEDED_ROUNDING ) * DONORS_NEEDED_ROUNDING;
	}

	private calculateProjection( base: number, increasePerMinute: number ): number {
		if ( !this._timeRange.hasStarted() ) {
			return 0;
		}

		if ( this._timeRange.hasEnded() ) {
			return base + this._timeRange.minutesBetweenStartAndEnd() * increasePerMinute;
		}

		return base + this._timeRange.minutesSinceStart() * increasePerMinute;
	}
}
