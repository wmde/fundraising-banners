import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';

describe( 'BannerFooter.vue', () => {
	it( 'emits event when use of funds link is clicked', () => {
		const wrapper = shallowMount( BannerFooter, {
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );

		wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

		expect( wrapper.emitted( 'showFundsModal' ).length ).toBe( 1 );
	} );
} );
