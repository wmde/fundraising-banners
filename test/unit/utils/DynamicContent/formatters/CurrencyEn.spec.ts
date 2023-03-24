import { describe, expect, it } from 'vitest';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';

describe( 'CurrencyEn', () => {
	const formatter = new CurrencyEn();

	describe( '#millions', () => {
		it( 'adds suffix and currency', () => {
			expect( formatter.millions( 8 ) ).toBe( '€8.0M' );
		} );

		it( 'rounds numbers', () => {
			expect( formatter.millions( 0.09 ) ).toBe( '€0.1M' );
			expect( formatter.millions( 8.1 ) ).toBe( '€8.1M' );
			expect( formatter.millions( 8.04 ) ).toBe( '€8.0M' );
		} );
	} );

	describe( '#millionsNumeric', () => {
		it( 'divides and formats the number', () => {
			expect( formatter.millionsNumeric( 8_000_000 ) ).toBe( '8.0' );
			expect( formatter.millionsNumeric( 4_100_000 ) ).toBe( '4.1' );
			expect( formatter.millionsNumeric( 2_050_000 ) ).toBe( '2.1' );
		} );
	} );
} );
