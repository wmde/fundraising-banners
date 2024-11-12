import { describe, it, expect } from 'vitest';
import TimeRange from '@src/utils/TimeRange';
import { Translator } from '@src/Translator';
import { DaysPassedSentence } from '@src/utils/DynamicContent/generators/DaysPassedSentence';

describe( 'DaysPassedSentence', function () {
	const translator = new Translator( {
		'prefix-days-left': 'only',
		'suffix-days-left': 'left',
		'day-singular': 'day',
		'day-plural': 'days'
	} );

	it( 'should return a sentence for the first day', function () {
		const campaignDays = new TimeRange( new Date( 2023, 10, 11 ), new Date( 2024, 0, 1 ), new Date( 2023, 10, 12 ) );
		const daysLeft = new DaysPassedSentence( campaignDays, translator );
		expect( daysLeft.getText() ).toBe( '1 day' );
	} );

	it( 'should return a sentence for other days', function () {
		const campaignDays = new TimeRange( new Date( 2023, 10, 11 ), new Date( 2024, 0, 1 ), new Date( 2023, 11, 25 ) );
		const daysLeft = new DaysPassedSentence( campaignDays, translator );
		expect( daysLeft.getText() ).toBe( '44 days' );
	} );
} );
