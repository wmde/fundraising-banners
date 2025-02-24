import { describe, expect, it, test } from 'vitest';
import { parseIntegerFromFormattedString } from '@src/utils/parseIntegerFromFormattedString';

describe( 'parseIntegerFromFormattedString', () => {

	// the expected output values use "_XX" separater to visually indicate the 2 digit cent values
	test.each( [
		[ '4,3', 4_30 ],
		[ '0', 0 ],
		[ '1', 1_00 ],
		[ '0,0000000001', 0 ],
		[ '0.9999999999', 99 ],
		[ '999999999999999', 999_999_999_999_999_00 ],
		[ '9999999999.99999', 9_999_999_999_99 ],
		[ '11,22,33.99', 112_233_99 ],
		[ '11.22.33,99', 112_233_99 ]
	] )( 'parses integer (cents) from float-like looking euro string', ( input: string, expectedOutput: number ) => {
		expect( parseIntegerFromFormattedString( input ) ).toBe( expectedOutput );
	} );

	it( 'strips off non-numeric characters', () => {
		expect( parseIntegerFromFormattedString( 'abc5.3abc' ) ).toBe( 5_30 );
	} );

	it( 'returns 0 for non-numeric input', () => {
		expect( parseIntegerFromFormattedString( 'a_bc' ) ).toBe( 0 );
		expect( parseIntegerFromFormattedString( '.' ) ).toBe( 0 );
		expect( parseIntegerFromFormattedString( ',' ) ).toBe( 0 );
	} );
} );
