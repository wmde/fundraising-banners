import { describe, expect, it } from 'vitest';
import { ImpressionCountStub } from '@test/fixtures/ImpressionCountStub';
import { createFallbackDonationLink } from '@src/createFallbackDonationLink';

describe( 'createFallbackDonationLink', () => {
	it( 'should create fallback donation link', () => {
		const extraParameters = { locale: 'de_DE', ast: '1' };
		const ctrlLink = createFallbackDonationLink( { campaign: 'C1', keyword: 'banner-ctrl' }, new ImpressionCountStub(), extraParameters );
		const varLink = createFallbackDonationLink( { campaign: 'C1', keyword: 'banner-var' }, new ImpressionCountStub(), extraParameters );
		const expected = 'https://spenden.wikimedia.de?piwik_kwd=banner-mini&piwik_campaign=C1&impCount=1&bImpCount=1&locale=de_DE&ast=1';

		expect( ctrlLink ).toStrictEqual( expected );
		expect( varLink ).toStrictEqual( expected );
	} );
} );
