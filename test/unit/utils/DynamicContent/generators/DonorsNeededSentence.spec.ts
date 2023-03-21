import { describe, expect, it } from 'vitest';
import { DonorsNeededSentence } from '@src/utils/DynamicContent/generators/DonorsNeededSentence';
import { Translator } from '@src/Translator';

describe( 'DonorsNeededSentence', () => {
	it( 'returns empty string if donors needed is zero', function () {
		const donorsNeeded = new DonorsNeededSentence( 0, new Translator( {} ) );

		expect( donorsNeeded.get() ).toEqual( '' );
	} );

	it( 'returns donors needed sentence if number is less than 100', function () {
		const donorsNeeded = new DonorsNeededSentence( 99, new Translator( { 'remaining-donors-needed-sentence': '{{donorsNeeded}}' } ) );

		expect( donorsNeeded.get() ).toEqual( '99' );
	} );

	it( 'returns rounded donors needed sentence if number is over 100', function () {
		const donorsNeeded = new DonorsNeededSentence( 101, new Translator( { 'remaining-donors-needed-sentence': '{{donorsNeeded}}' } ) );

		expect( donorsNeeded.get() ).toEqual( '100' );
	} );
} );
