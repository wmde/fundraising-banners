import { describe, expect, it, afterEach, beforeEach, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';

describe( 'SoftClose', function () {

	beforeEach( () => {
		vi.useFakeTimers();
	} );

	afterEach( () => {
		vi.restoreAllMocks();
	} );

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

	it( 'should display the remaining seconds decremented every second', async () => {
		const wrapper = shallowMount( SoftClose, {
			global: {
				mocks: {
					$translate: ( key: string, templateTags: Record<string, string | number> = {} ) => {
						return templateTags === undefined ? key : templateTags.seconds;
					}
				}
			}
		} );

		const seconds = wrapper.find( '.wmde-banner-soft-close-countdown-text-wrapper' );

		expect( seconds.text() ).toBe( '15' );

		await vi.advanceTimersByTimeAsync( 1000 );
		expect( seconds.text() ).toBe( '14' );

		await vi.advanceTimersByTimeAsync( 1000 );
		expect( seconds.text() ).toBe( '13' );

		await vi.advanceTimersByTimeAsync( 1000 );
		expect( seconds.text() ).toBe( '12' );
	} );

	it( 'should emit timeOutClose when the internal countdown is <= 1', () => {
		const wrapper = shallowMount( SoftClose, {
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );
		vi.runAllTimers();
		expect( wrapper.emitted( 'timeOutClose' ).length ).toBe( 1 );
	} );

	it( 'should not show the extra close icon', () => {
		const wrapper = shallowMount( SoftClose, {
			props: {
				showCloseIcon: false
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );

		expect( wrapper.classes() ).not.toContain( 'wmde-banner-soft-close-with-close-icon' );
		expect( wrapper.findComponent( ButtonClose ).exists() ).toBeFalsy();
	} );

	it( 'should show the extra close icon', () => {
		const wrapper = shallowMount( SoftClose, {
			props: {
				showCloseIcon: true
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );

		expect( wrapper.classes() ).toContain( 'wmde-banner-soft-close-with-close-icon' );
		expect( wrapper.findComponent( ButtonClose ).exists() ).toBeTruthy();
	} );

	it( 'should emit close event when user clicks close icon', function () {
		const wrapper = mount( SoftClose, {
			props: {
				showCloseIcon: true
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );

		wrapper.findComponent( ButtonClose ).trigger( 'click' );

		expect( wrapper.emitted( 'close' ).length ).toBe( 1 );
	} );
} );
