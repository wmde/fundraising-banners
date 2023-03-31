import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';

describe( 'SoftClose', function () {
	it( 'should emit close event when user clicks close button', function () {
		const wrapper = shallowMount( SoftClose, {
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );

		wrapper.find( '.wmde-banner-soft-close-button-close' ).trigger( 'click' );

		expect( wrapper.emitted( 'close' ).length ).toBe( 1 );
	} );

	it( 'should emit maybeLater event when user clicks maybe later button', function () {
		const wrapper = shallowMount( SoftClose, {
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );

		wrapper.find( '.wmde-banner-soft-close-button-maybe-later' ).trigger( 'click' );

		expect( wrapper.emitted( 'maybeLater' ).length ).toBe( 1 );
	} );

	// hint: https://vitest.dev/guide/mocking.html#timers
	it.todo( 'should emit timeOutClose when the internal countdown is <= 1' );

	it.todo( 'should display the remaining seconds' );
} );
