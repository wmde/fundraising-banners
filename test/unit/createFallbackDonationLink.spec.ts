import { describe, expect, it } from 'vitest';
import { ImpressionCountStub } from '@test/fixtures/ImpressionCountStub';
import { createDonationURL } from '@src/createDonationURL';

describe( 'createFallbackDonationLink', () => {
	it( 'should create fallback donation link', () => {
		const extraParameters = { locale: 'de_DE', ast: '1' };
		const ctrlLink = createDonationURL( { campaign: 'C1', keyword: 'banner-ctrl' }, new ImpressionCountStub(), true, extraParameters );
		const varLink = createDonationURL( { campaign: 'C1', keyword: 'banner-var' }, new ImpressionCountStub(), true, extraParameters );
		const expected = 'https://spenden.wikimedia.de?piwik_kwd=banner-mini&piwik_campaign=C1&impCount=1&bImpCount=1&locale=de_DE&ast=1';

		expect( ctrlLink ).toStrictEqual( expected );
		expect( varLink ).toStrictEqual( expected );
	} );
} );
