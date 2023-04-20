import { describe, expect, it } from 'vitest';
import PageDe, { WpdeWindow } from '@src/page/PageDe';

const tracking = { campaign: 'testCampaign', keyword: 'testKeyword' };

declare let window: WpdeWindow;
describe( 'PageDe', function () {
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
			startDate: '2023-11-01'
		};
		const page = new PageDe( tracking );

		const retrievedCampaignParameters = page.getCampaignParameters();

		expect( retrievedCampaignParameters.startDate ).toBe( '2023-11-01' );
	} );

	it( 'throws error if campaign parameters are not set in global namespace', () => {
		delete window.campaignParameters;
		const page = new PageDe( tracking );
		expect( () => page.getCampaignParameters() ).toThrow( 'Campaign parameters are not set globally' );
	} );

	it( 'returns banner tracking keyword and campaign', () => {
		const testTracking = { campaign: 'a-campaign', keyword: 'org-00-2023-blabla-ctrl' };
		const page = new PageDe( testTracking );

		const retrievedTrackingKeyword = page.getTracking();

		expect( retrievedTrackingKeyword.keyword ).toBe( 'org-00-2023-blabla-ctrl' );
		expect( retrievedTrackingKeyword.campaign ).toBe( 'a-campaign' );
	} );
} );
