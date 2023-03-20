import { describe, expect, test } from 'vitest';
import { OrdinalEn } from '@src/utils/DynamicContent/formatters/OrdinalEn';

describe( 'OrdinalEn', () => {
	test.each( [
		[ 1, '1st' ],
		[ 2, '2nd' ],
		[ 3, '3rd' ],
		[ 4, '4th' ],
		[ 5, '5th' ],
		[ 6, '6th' ],
		[ 7, '7th' ],
		[ 8, '8th' ],
		[ 9, '9th' ],
		[ 10, '10th' ],
		[ 11, '11th' ],
		[ 12, '12th' ],
		[ 13, '13th' ],
		[ 21, '21st' ],
		[ 58, '58th' ],
		[ 218, '218th' ],
		[ 3453, '3453rd' ],
		[ 56781, '56781st' ],
		[ 42424242424242, '42424242424242nd' ]
	] )( 'returns correct ordinal given various numbers', ( date: number, expected: string ) => {
		expect( ( new OrdinalEn() ).get( date ) ).toEqual( expected );
	} );
} );
