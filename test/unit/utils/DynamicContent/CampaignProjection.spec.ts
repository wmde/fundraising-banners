import { describe, expect, it } from 'vitest';
import TimeRange from '@src/utils/TimeRange';
import { CampaignProjectionParameters } from '@src/CampaignParameters';
import { CampaignProjection } from '@src/utils/DynamicContent/CampaignProjection';

const startDate = new Date( 2023, 10, 11 );
const endDate = new Date( 2023, 11, 31, 23, 59, 59 );
const after12HoursDate = new Date( 2023, 10, 11, 12 );
const after24HoursDate = new Date( 2023, 10, 12 );

const campaignProjectionParameters: CampaignProjectionParameters = {
	averageAmountPerDonation: 0,
	baseDate: '2023-11-12',
	baseDonationSum: 100_000,
	donationAmountPerMinute: 10.3,
	donorsBase: 105,
	donorsNeeded: 0,
	donorsPerMinute: 0,
	goalDonationSum: 9_000_000,
	projectedDonors: 0
};
describe( 'CampaignProjection', function () {
	describe( '#getProjectedDonationSum()', function () {
		it( 'should return donation sum projection based on number of passed seconds', function () {
			const campaignDaysOnStart = new TimeRange( startDate, endDate, after12HoursDate );
			const campaignDaysAfter24Hours = new TimeRange( startDate, endDate, after24HoursDate );
			const campaignProjectionOnStart = new CampaignProjection( campaignProjectionParameters, campaignDaysOnStart );
			const campaignProjectionAfter24Hours = new CampaignProjection( campaignProjectionParameters, campaignDaysAfter24Hours );
			expect( campaignProjectionOnStart.getProjectedDonationSum() ).toBe( 107416 );
			expect( campaignProjectionAfter24Hours.getProjectedDonationSum() ).toBe( 114832 );
		} );
	} );
} );
