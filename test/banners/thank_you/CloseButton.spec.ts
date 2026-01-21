import { describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import CloseButton from '@banners/thank_you/components/CloseButton.vue';
import thankYouContent from '@test/fixtures/ThankYouContent';

describe( 'CloseButton.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return mount( CloseButton, {
			props: {
				hideLabel: false,
				thankYouContent
			}
		} );
	};

	it( 'Emits events', async () => {
		const wrapper = getWrapper();

		await wrapper.find( 'button' ).trigger( 'click' );

		expect( wrapper.emitted( 'click' ).length ).toStrictEqual( 1 );
	} );

	it( 'Hides the label', async () => {
		const wrapper = getWrapper();

		expect( wrapper.find( '.visually-hidden' ).exists() ).toBeFalsy();

		await wrapper.setProps( { hideLabel: true } );

		expect( wrapper.find( '.visually-hidden' ).exists() ).toBeTruthy();
	} );
} );
