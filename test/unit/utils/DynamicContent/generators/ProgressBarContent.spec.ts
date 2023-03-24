import { describe, expect, it } from 'vitest';
import { ProgressBarContent } from '@src/utils/DynamicContent/generators/ProgressBarContent';
import { Translator } from '@src/Translator';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';

describe( 'ProgressBarContent', function () {
	const progressBarContent = new ProgressBarContent(
		9_000_000,
		33.3333,
		3_000_000,
		6_000_000,
		new Translator( {} ),
		new CurrencyEn()
	);

	it( 'should return percentage towards target', function () {
		expect( progressBarContent.percentageTowardsTarget ).toBe( 33.3333 );
	} );

	it( 'should return donation target sentence', function () {
		expect( progressBarContent.donationTarget ).toBe( 'amount-total €9.0M' );
	} );
} );
