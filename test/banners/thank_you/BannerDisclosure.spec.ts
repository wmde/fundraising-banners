import { expect, describe, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import BannerDisclosure from '@banners/thank_you/components/BannerDisclosure.vue';
import thankYouContent from '@test/fixtures/ThankYouContent';

describe( 'BannerDisclosure.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( BannerDisclosure, {
			props: {
				id: 'disclosure',
				thankYouContent
			}
		} );
	};

	it( 'shows the correct read more/read less text', async () => {
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-b-disclosure__read-more' ).text() ).toContain( 'read-more' );

		await wrapper.find( 'summary' ).trigger( 'click' );
		await wrapper.find( 'details' ).trigger( 'toggle' );

		expect( wrapper.find( '.wmde-b-disclosure__read-more' ).text() ).toContain( 'read-less' );

		await wrapper.find( 'summary' ).trigger( 'click' );
		await wrapper.find( 'details' ).trigger( 'toggle' );

		expect( wrapper.find( '.wmde-b-disclosure__read-more' ).text() ).toContain( 'read-more' );
	} );

	it( 'toggles when the read more button is clicked', async () => {
		const wrapper = getWrapper();

		expect( wrapper.find<HTMLDetailsElement>( 'details' ).element.open ).toBeFalsy();

		await wrapper.find( '.wmde-b-disclosure__read-more' ).trigger( 'click' );

		expect( wrapper.find<HTMLDetailsElement>( 'details' ).element.open ).toBeTruthy();

		await wrapper.find( '.wmde-b-disclosure__read-more' ).trigger( 'click' );

		expect( wrapper.find<HTMLDetailsElement>( 'details' ).element.open ).toBeFalsy();
	} );
} );
