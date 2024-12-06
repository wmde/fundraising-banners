import { describe, expect, it } from 'vitest';
import { createFAQPageURL } from '@src/createFAQPageURL';

describe( 'createFAQURL', () => {
	it( 'should create FAQ page URL with tracking information', () => {
		const ctrlLink = createFAQPageURL( { campaign: 'C1', keyword: 'banner-ctrl' } );
		const varLink = createFAQPageURL( { campaign: 'C1', keyword: 'banner-var' } );

		expect( ctrlLink ).toStrictEqual( 'https://spenden.wikimedia.de/faq?piwik_kwd=banner-ctrl_faq&piwik_campaign=C1' );
		expect( varLink ).toStrictEqual( 'https://spenden.wikimedia.de/faq?piwik_kwd=banner-var_faq&piwik_campaign=C1' );
	} );
} );
