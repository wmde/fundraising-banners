import { describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import FooterAlreadyDonated from '@src/components/Footer/FooterAlreadyDonated.vue';

describe( 'FooterAlreadyDonated.vue', () => {

	const getWrapper = (): VueWrapper<any> => {
		return shallowMount( FooterAlreadyDonated, {
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );
	};

	it( 'emits event when use of funds link is clicked', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

		expect( wrapper.emitted( 'showFundsModal' ).length ).toBe( 1 );
	} );

	it( 'emits event when already donated link is clicked', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );

		expect( wrapper.emitted( 'showAlreadyDonatedModal' ).length ).toBe( 1 );
	} );
} );
