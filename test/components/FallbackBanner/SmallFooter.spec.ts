import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SmallFooter from '@src/components/FallbackBanner/SmallFooter.vue';

describe( 'SmallFooter.vue', () => {
	it( 'emits show use of funds event on use of funds link click', async () => {
		const wrapper = mount( SmallFooter, {
			props: {
				slideIndex: 0,
				slideCount: 5
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );

		await wrapper.find( '.wmde-fbb-usage-link' ).trigger( 'click' );

		expect( wrapper.emitted( 'use-of-funds-button-clicked' ).length ).toStrictEqual( 1 );
	} );
} );
