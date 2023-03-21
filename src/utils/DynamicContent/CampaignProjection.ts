import { CampaignProjectionParameters } from '@src/CampaignParameters';
import TimeRange from '@src/utils/TimeRange';

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

	public donorsNeeded(): number {
		return Math.round( this.getProjectedRemainingDonationSum() / this.campaignProjectionParameters.averageAmountPerDonation );
	}

	public getProjectedDonationSum() {
		return this.calculateProjection(
			this.campaignProjectionParameters.baseDonationSum,
			this.campaignProjectionParameters.donationAmountPerMinute
		);
	}

	private getProjectedRemainingDonationSum() {
		const remainingAmount = this.campaignProjectionParameters.goalDonationSum - this.getProjectedDonationSum();
		return Math.round( remainingAmount / 100000 ) * 100000;
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
