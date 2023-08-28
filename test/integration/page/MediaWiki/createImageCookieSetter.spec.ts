import { describe, expect, it, vi, vitest } from 'vitest';
import { createImageCookieSetter } from '@src/page/MediaWiki/createImageCookieSetter';

describe( 'createImageCookieSetter', () => {
	it( 'creates the image cookie setter', () => {
		const element = { src: '' };
		const documentMock = {
			createElement: vi.fn( () => element )
		};
		vitest.stubGlobal( 'document', documentMock );

		createImageCookieSetter( 'fun', 424242, '//en.wikipedia.org/w/index.php?title=Special:HideBanners' );

		expect( document.createElement ).toHaveBeenCalledOnce();
		expect( element.src ).toBe( 'https://en.wikipedia.org/w/index.php?title=Special%3AHideBanners&duration=424242&category=fundraising&reason=fun' );
	} );
} );
