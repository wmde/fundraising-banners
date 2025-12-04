import { getCampaignParameterOverride } from '@src/environment/prod/CampaignParameterOverride';
import { describe, expect, it } from 'vitest';
import { CampaignParameters } from '@src/domain/CampaignParameters';

describe( 'getCampaignParameterOverride (prod version)', () => {
	it( 'Returns the input parameters', () => {
		const params: CampaignParameters = {
			campaignProjection: {
				averageAmountPerDonation: 0,
				donationAmountPerMinute: 0,
				donationCountBase: 0,
				donationCountPerMinute: 0,
				donationSumBase: 0,
				donationTarget: 0,
				updatedAt: ''
			},
			endDate: '',
			millionImpressionsPerDay: 0,
			numberOfMembers: 0,
			startDate: '',
			isLateProgress: true,
			dramaTextIsVisible: false,
			urgencyMessageDaysLeft: 0
		};

		const modifiedParams = getCampaignParameterOverride( params );

		expect( modifiedParams === params ).toBe( true );
	} );
} );
