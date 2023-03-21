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
	private readonly campaignProjectionParameters: CampaignProjectionParameters;
	private readonly timeRange: TimeRange;

	constructor( campaignProjectionParameters: CampaignProjectionParameters, timeRange: TimeRange ) {
		this.campaignProjectionParameters = campaignProjectionParameters;
		this.timeRange = timeRange;
	}

	public projectedDonors(): number {
		return this.calculateProjection(
			this.campaignProjectionParameters.donorsBase,
			this.campaignProjectionParameters.donorsPerMinute
		);
	}

	public remainingDonorsNeeded(): number {
		return Math.round( this.projectedRemainingDonationSum() / this.campaignProjectionParameters.averageAmountPerDonation );
	}

	public projectedDonationSum(): number {
		return this.calculateProjection(
			this.campaignProjectionParameters.baseDonationSum,
			this.campaignProjectionParameters.donationAmountPerMinute
		);
	}

	private projectedRemainingDonationSum(): number {
		const remainingAmount = this.campaignProjectionParameters.goalDonationSum - this.projectedDonationSum();
		return Math.round( remainingAmount / DONORS_NEEDED_ROUNDING ) * DONORS_NEEDED_ROUNDING;
	}

	private calculateProjection( base: number, increasePerMinute: number ): number {
		if ( !this.timeRange.hasStarted() ) {
			return 0;
		}

		if ( this.timeRange.hasEnded() ) {
			return base + this.timeRange.minutesBetweenStartAndEnd() * increasePerMinute;
		}

		return base + this.timeRange.minutesSinceStart() * increasePerMinute;
	}
}
