import { describe, expect, it } from 'vitest';
import PageWPDE, { WpdeWindow } from '@src/page/PageWPDE';

const tracking = { campaign: 'testCampaign', keyword: 'testKeyword' };

declare let window: WpdeWindow;
describe( 'PageWPDE', function () {
	it( 'returns campaign parameters', () => {
		window.campaignParameters = {
			campaignProjection: {
				averageAmountPerDonation: 15,
				updatedAt: '',
				donationSumBase: 0,
				donationAmountPerMinute: 15,
				donationCountBase: 0,
				donationCountPerMinute: 1,
				donationTarget: 20
			},
			endDate: '2023-12-31',
			millionImpressionsPerDay: 0,
			numberOfMembers: 0,
			startDate: '2023-11-01',
			isLateProgress: false,
			thankYouCampaign: {
				progressBarPercentage: 80,
				numberOfDonors: 42
			}
		};
		const page = new PageWPDE( tracking );

		const retrievedCampaignParameters = page.getCampaignParameters();

		expect( retrievedCampaignParameters.startDate ).toBe( '2023-11-01' );
	} );

	it( 'throws error if campaign parameters are not set in global namespace', () => {
		delete window.campaignParameters;
		const page = new PageWPDE( tracking );
		expect( () => page.getCampaignParameters() ).toThrow( 'Campaign parameters are not set globally' );
	} );

	it( 'returns banner tracking keyword and campaign', () => {
		const testTracking = { campaign: 'a-campaign', keyword: 'org-00-2023-blabla-ctrl' };
		const page = new PageWPDE( testTracking );

		const retrievedTrackingKeyword = page.getTracking();

		expect( retrievedTrackingKeyword.keyword ).toBe( 'org-00-2023-blabla-ctrl' );
		expect( retrievedTrackingKeyword.campaign ).toBe( 'a-campaign' );
	} );
} );
