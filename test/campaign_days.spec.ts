import { describe, it, expect } from 'vitest';

import CampaignDays, { endOfDay, startOfDay } from '../src/campaign_days';

describe( 'startOfDay', function () {
	it( 'returns the first second of the day', function () {
		expect( startOfDay( '2017-11-01' ).getTime() ).toEqual( new Date( 2017, 10, 1, 0, 0, 0 ).getTime() );
	} );

	it( 'throws errors when date string is malformed', function () {
		expect( () => startOfDay( '2017-01-4' ) ).toThrow( /wrong date string format/i );
	} );
} );

describe( 'endOfDay', function () {
	it( 'returns the first second of the day', function () {
		expect( endOfDay( '2017-12-31' ).getTime() ).toEqual( new Date( 2017, 11, 31, 23, 59, 59 ).getTime() );
	} );

	it( 'throws errors when date string is malformed', function () {
		expect( () => endOfDay( '2017-01-4' ) ).toThrow( /wrong date string format/i );
	} );
} );

describe( 'CampaignDays', function () {

	const CAMPAIGN_START = new Date( 2016, 10, 1, 0, 0, 0 );
	const CAMPAIGN_END = new Date( 2016, 11, 31, 23, 59, 59 );

	describe( '#campaignHasStarted', function () {
		it( 'returns false when campaign has not started yet', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 9, 1, 0, 0, 0 ) );
			expect( campaignDays.campaignHasStarted() ).toBe( false );
		} );

		it( 'returns true when campaign on first day of campaign', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 10, 1, 0, 0, 5 ) );
			expect( campaignDays.campaignHasStarted() ).toBe( true );
		} );

		it( 'returns true when campaign on last day of campaign', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 11, 31, 23, 59, 58 ) );
			expect( campaignDays.campaignHasStarted() ).toBe( true );
		} );

		it( 'returns true when campaign is over', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2017, 0, 1, 0, 0, 0 ) );
			expect( campaignDays.campaignHasStarted() ).toBe( true );
		} );
	} );

	describe( '#campaignHasEnded', function () {
		it( 'returns false when campaign has not started yet', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 9, 1, 0, 0, 0 ) );
			expect( campaignDays.campaignHasEnded() ).toBe( false );
		} );

		it( 'returns false when campaign on first day of campaign', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 10, 1, 0, 0, 5 ) );
			expect( campaignDays.campaignHasEnded() ).toBe( false );
		} );

		it( 'returns false when campaign on last day of campaign', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 11, 31, 23, 59, 58 ) );
			expect( campaignDays.campaignHasEnded() ).toBe( false );
		} );

		it( 'returns true when campaign is over', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2017, 0, 1, 0, 0, 0 ) );
			expect( campaignDays.campaignHasEnded() ).toBe( true );
		} );
	} );

	describe( '#getSecondsSinceCampaignStart', function () {
		it( 'returns a negative number before the campaign', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 9, 31, 0, 0, 0 ) );
			expect( campaignDays.getSecondsSinceCampaignStart() ).toBe( -86400 );
		} );

		it( 'returns a positive number after the campaign started', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 10, 3, 0, 0, 0 ) );
			expect( campaignDays.getSecondsSinceCampaignStart() ).toBe( 172800 );
		} );

		it( 'continues counting when the campaign has ended', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2017, 2, 4, 0, 0, 0 ) );
			expect( campaignDays.getSecondsSinceCampaignStart() ).toBe( 10627200 );
		} );

	} );

	describe( '#getSecondsBetweenStartAndEndOfCampaign', function () {
		it( 'returns a number of seconds', function () {
			let campaignDays = new CampaignDays( CAMPAIGN_START, new Date( 2016, 10, 2, 0, 0, 0 ), new Date( 2016, 9, 31, 0, 0, 0 ) );
			expect( campaignDays.getSecondsBetweenStartAndEndOfCampaign() ).toBe( 86400 );

			campaignDays = new CampaignDays( CAMPAIGN_START, new Date( 2016, 10, 3, 0, 0, 0 ), new Date( 2016, 9, 31, 0, 0, 0 ) );
			expect( campaignDays.getSecondsBetweenStartAndEndOfCampaign() ).toBe( 172800 );
		} );

	} );

	describe( '#getSecondsUntilCampaignEnds', function () {
		it( 'returns a positive number before the campaign', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 9, 31, 23, 59, 59 ) );
			expect( campaignDays.getSecondsUntilCampaignEnds() ).toBe( 5270400 );
		} );

		it( 'returns a positive number after the campaign started', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 11, 31, 23, 59, 54 ) );
			expect( campaignDays.getSecondsUntilCampaignEnds() ).toBe( 5 );
		} );

		it( 'returns a negative number when the campaign has ended', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2017, 0, 1, 0, 0, 4 ) );
			expect( campaignDays.getSecondsUntilCampaignEnds() ).toBe( -5 );
		} );

	} );

	describe( '#getNumberOfDaysUntilCampaignEnd', function () {
		it( 'returns the number of days until the defined end of the campaign', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 9, 31, 23, 59, 59 ) );
			expect( campaignDays.getNumberOfDaysUntilCampaignEnd() ).toBe( 61 );
		} );

		it( 'returns 1 on the last day of the campaign', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2016, 11, 31, 23, 59, 54 ) );
			expect( campaignDays.getNumberOfDaysUntilCampaignEnd() ).toBe( 1 );
		} );

		it( 'returns zero on the first day after the campaign', function () {
			const campaignDays = new CampaignDays( CAMPAIGN_START, CAMPAIGN_END, new Date( 2017, 0, 1, 0, 0, 4 ) );
			expect( campaignDays.getNumberOfDaysUntilCampaignEnd() ).toBe( -0 );
		} );

	} );

} );
