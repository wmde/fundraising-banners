import { describe, expect, it } from 'vitest';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';

describe( 'CurrencyEn', () => {
	const formatter = new CurrencyEn();

	describe( '#euroAmount', () => {
		it( 'returns single integer euro when cents are zero', () => {
			expect( formatter.euroAmount( 1 ) ).toBe( '€1' );
			expect( formatter.euroAmount( 1.0 ) ).toBe( '€1' );
			expect( formatter.euroAmount( 24.00 ) ).toBe( '€24' );
			expect( formatter.euroAmount( 24.000001 ) ).toBe( '€24' );
			expect( formatter.euroAmount( 100 ) ).toBe( '€100' );
		} );

		it( 'returns euro amount with 2 decimal places, 0-padding if needed', () => {
			expect( formatter.euroAmount( 1.23 ) ).toBe( '€1.23' );
			expect( formatter.euroAmount( 1.20 ) ).toBe( '€1.20' );
			expect( formatter.euroAmount( 1.2 ) ).toBe( '€1.20' );
		} );

		it( 'rounds cents to two digits', () => {
			expect( formatter.euroAmount( 1.594 ) ).toBe( '€1.59' );
			expect( formatter.euroAmount( 1.595 ) ).toBe( '€1.60' );
			expect( formatter.euroAmount( 1.599 ) ).toBe( '€1.60' );
			expect( formatter.euroAmount( 1.201 ) ).toBe( '€1.20' );
		} );
	} );

	describe( '#customAmountInput', () => {
		it( 'returns amount with 2 decimal places, 0-padding if needed', () => {
			expect( formatter.customAmountInput( 1 ) ).toBe( '1.00' );
			expect( formatter.customAmountInput( 1.0 ) ).toBe( '1.00' );
			expect( formatter.customAmountInput( 24.00 ) ).toBe( '24.00' );
			expect( formatter.customAmountInput( 24.000001 ) ).toBe( '24.00' );
			expect( formatter.customAmountInput( 100 ) ).toBe( '100.00' );
			expect( formatter.customAmountInput( 1.23 ) ).toBe( '1.23' );
			expect( formatter.customAmountInput( 1.20 ) ).toBe( '1.20' );
			expect( formatter.customAmountInput( 1.2 ) ).toBe( '1.20' );
		} );

		it( 'rounds cents to two digits', () => {
			expect( formatter.customAmountInput( 1.594 ) ).toBe( '1.59' );
			expect( formatter.customAmountInput( 1.595 ) ).toBe( '1.60' );
			expect( formatter.customAmountInput( 1.599 ) ).toBe( '1.60' );
			expect( formatter.customAmountInput( 1.201 ) ).toBe( '1.20' );
		} );
	} );

	describe( '#millions', () => {
		it( 'creates a fractional amount and adds suffix and currency', () => {
			expect( formatter.millions( 8_000_000 ) ).toBe( '€8.0M' );
		} );

		it( 'rounds numbers', () => {
			expect( formatter.millions( 90_000 ) ).toBe( '€0.1M' );
			expect( formatter.millions( 8_100_000 ) ).toBe( '€8.1M' );
			expect( formatter.millions( 8_040_000 ) ).toBe( '€8.0M' );
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
