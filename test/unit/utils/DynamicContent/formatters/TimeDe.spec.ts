import { describe, expect, it } from 'vitest';
import { TimeDe } from '@src/utils/DynamicContent/formatters/TimeDe';

describe( 'TimeDe', () => {
	it( 'returns the formatted time', () => {
		const time = new TimeDe();
		const date = new Date( 2023, 11, 1, 13, 42, 12 );

		expect( time.getFormatted( date ) ).toBe( '13:42' );
	} );
} );
