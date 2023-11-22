import { describe, expect, it } from 'vitest';
import { TimeEn } from '@src/utils/DynamicContent/formatters/TimeEn';

describe( 'TimeEn', () => {
	it( 'returns the formatted time', () => {
		const time = new TimeEn();
		const date = new Date( 2023, 11, 1, 13, 42, 12 );

		// In some test environments the output of Date.toLocaleString includes the code for a space,
		// but in others it doesn't. To fix that we manually replace it in this test
		expect( time.getFormatted( date ).replace( '\u202f', ' ' ) ).toStrictEqual( '1:42 pm' );
	} );
} );
