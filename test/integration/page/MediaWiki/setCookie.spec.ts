import { describe, expect, it } from 'vitest';
import { setCookie } from '@src/page/MediaWiki/setCookie';

describe( 'setCookie', () => {
	it( 'sets the cookie for fundraising banners', () => {
		const tenDaysInSeconds = 60 * 60 * 24 * 10;
		Object.defineProperty( document, 'cookie', { writable: true, configurable: true, value: '' } );

		setCookie(
			'testReason',
			new Date( 'August 29, 1997 02:14:00 GMT' ),
			tenDaysInSeconds,
			'fundraising'
		);

		expect( document.cookie ).toBe( [
			'centralnotice_hide_fundraising=%7B%22v%22%3A1%2C%22created%22%3A872820840%2C%22reason%22%3A%22testReason%22%7D;',
			'expires=Mon, 08 Sep 1997 02:14:00 GMT;',
			'path=/;',
			'SameSite=None;',
			'Secure;'
		].join( ' ' ) );
	} );

	it( 'sets the cookie for thankyou banners', () => {
		const tenDaysInSeconds = 60 * 60 * 24 * 10;
		Object.defineProperty( document, 'cookie', { writable: true, configurable: true, value: '' } );

		setCookie(
			'testReason',
			new Date( 'August 29, 1997 02:14:00 GMT' ),
			tenDaysInSeconds,
			'fundraisingThankyou'
		);

		expect( document.cookie ).toBe( [
			'centralnotice_hide_fundraisingThankyou=%7B%22v%22%3A1%2C%22created%22%3A872820840%2C%22reason%22%3A%22testReason%22%7D;',
			'expires=Mon, 08 Sep 1997 02:14:00 GMT;',
			'path=/;',
			'SameSite=None;',
			'Secure;'
		].join( ' ' ) );
	} );
} );
