import { describe, expect, it, test } from 'vitest';
import { parseFloatFromFormattedString } from '@src/utils/parseFloatFromFormattedString';

describe( 'parseFloatFromFormattedString', () => {

	test.each( [
		[ '4,3', 4.3 ],
		[ '0', 0.0 ],
		[ '1', 1 ],
		[ '0,0000000001', 0.0000000001 ],
		[ '0.9999999999', 0.9999999999 ],
		[ '999999999999999', 999999999999999 ],
		[ '9999999999.99999', 9999999999.99999 ],
		[ '11,22,33.99', 112233.99 ],
		[ '11.22.33,99', 112233.99 ]
	] )( 'parses float from float-like looking string', ( input: string, expectedOutput: number ) => {
		expect( parseFloatFromFormattedString( input ) ).toBe( expectedOutput );
	} );

	it( 'strips off non-numeric characters', () => {
		expect( parseFloatFromFormattedString( 'abc5.3abc' ) ).toBe( 5.3 );
	} );

	it( 'returns 0 for non-numeric input', () => {
		expect( parseFloatFromFormattedString( 'a_bc' ) ).toBe( 0 );
		expect( parseFloatFromFormattedString( '.' ) ).toBe( 0 );
		expect( parseFloatFromFormattedString( ',' ) ).toBe( 0 );
	} );
} );
