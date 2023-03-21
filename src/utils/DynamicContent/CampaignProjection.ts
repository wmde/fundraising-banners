import { CampaignProjectionParameters } from '@src/CampaignParameters';
import CampaignDays from '@src/utils/CampaignDays';

export class CampaignProjection {
	private readonly campaignProjectionParameters: CampaignProjectionParameters;
	private readonly campaignDays: CampaignDays;

	constructor( campaignProjectionParameters: CampaignProjectionParameters, campaignDays: CampaignDays ) {
		this.campaignProjectionParameters = campaignProjectionParameters;
		this.campaignDays = campaignDays;
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
		if ( !this.campaignDays.campaignHasStarted() ) {
			return 0;
		}

		if ( this.campaignDays.campaignHasEnded() ) {
			return base + ( this.campaignDays.getSecondsBetweenStartAndEndOfCampaign() / 60 ) * increasePerMinute;
		}

		return base + ( this.campaignDays.getSecondsSinceCampaignStart() / 60 ) * increasePerMinute;
	}
}
