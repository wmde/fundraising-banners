import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MinimisedBanner from '../../../../banners/desktop/components/MinimisedBanner.vue';

describe( 'MinimisedBanner.vue', () => {
	it( 'emits close event', () => {
		const wrapper = mount( MinimisedBanner );

		wrapper.find( '.wmde-banner-close' ).trigger( 'click' );

		expect( wrapper.emitted( 'close' ).length ).toStrictEqual( 1 );
	} );

	it( 'emits maximise events', () => {
		const wrapper = mount( MinimisedBanner );

		wrapper.find( '.wmde-banner-minimised-maximise' ).trigger( 'click' );
		wrapper.find( '.wmde-banner-minimised-submit-button' ).trigger( 'click' );

		expect( wrapper.emitted( 'maximise' ).length ).toStrictEqual( 2 );
	} );
} );
