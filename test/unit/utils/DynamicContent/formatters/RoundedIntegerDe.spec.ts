import { describe, expect, it } from 'vitest';
import { RoundedIntegerDe } from '@src/utils/DynamicContent/formatters/RoundedIntegerDe';

describe( 'RoundedIntegerDe', function () {
	it( 'formats 1000 as 1.000', function () {
		expect( new RoundedIntegerDe().format( 1000 ) ).toBe( '1.000' );
	} );

	it( 'rounds 1001 to 1.000', function () {
		expect( new RoundedIntegerDe().format( 1001 ) ).toBe( '1.000' );
	} );

	it( 'rounds 1500 to 2.000', function () {
		expect( new RoundedIntegerDe().format( 1500 ) ).toBe( '2.000' );
	} );

	it( 'rounds 1999 to 2.000', function () {
		expect( new RoundedIntegerDe().format( 1999 ) ).toBe( '2.000' );
	} );
} );
