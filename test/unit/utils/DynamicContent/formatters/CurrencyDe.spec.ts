import { describe, expect, it } from 'vitest';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';

describe( 'CurrencyDe', () => {
	const formatter = new CurrencyDe();

	describe( '#millions', () => {
		it( 'creates a fractional amount and adds suffix and currency', () => {
			expect( formatter.millions( 8_000_000 ) ).toBe( '8,0 Mio. €' );
		} );

		it( 'rounds numbers', () => {
			expect( formatter.millions( 90_000 ) ).toBe( '0,1 Mio. €' );
			expect( formatter.millions( 8_100_000 ) ).toBe( '8,1 Mio. €' );
			expect( formatter.millions( 8_040_000 ) ).toBe( '8,0 Mio. €' );
		} );
	} );

	describe( '#millionsNumeric', () => {
		it( 'divides and formats the number', () => {
			expect( formatter.millionsNumeric( 8_000_000 ) ).toBe( '8,0' );
			expect( formatter.millionsNumeric( 4_100_000 ) ).toBe( '4,1' );
			expect( formatter.millionsNumeric( 2_050_000 ) ).toBe( '2,1' );
		} );
	} );
} );
