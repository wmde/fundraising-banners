import { describe, it, expect } from 'vitest';
import { DaysLeft } from '@src/utils/DynamicContent/generators/DaysLeft';
import CampaignDays from '@src/utils/CampaignDays';
import { Translator } from '@src/Translator';

describe( 'DaysLeft', function () {
	const translator = new Translator( {
		'prefix-days-left': 'only',
		'suffix-days-left': 'left',
		'day-singular': 'day',
		'day-plural': 'days'
	} );

	it( 'should return a sentence for when a several days are left', function () {
		const campaignDays = new CampaignDays( new Date( 2023, 10, 11 ), new Date( 2023, 11, 31, 23, 59, 59 ), new Date( 2023, 11, 25 ) );
		const daysLeft = new DaysLeft( campaignDays, translator );
		expect( daysLeft.get() ).toBe( 'only 7 days left' );
	} );

	it( 'should return a sentence for when one days is left', function () {
		const campaignDays = new CampaignDays( new Date( 2023, 10, 11 ), new Date( 2023, 11, 31, 23, 59, 59 ), new Date( 2023, 11, 30, 23, 59, 59 ) );
		const daysLeft = new DaysLeft( campaignDays, translator );
		expect( daysLeft.get() ).toBe( 'only 1 day left' );
	} );
} );
