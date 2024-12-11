import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import FullPageBanner from '@banners/thank_you_2024/components/FullPageBanner.vue';

describe( 'FullPageBanner.vue', () => {
	let showCallback: Mock;
	let closeCallback: Mock;

	beforeEach( () => {
		showCallback = vi.fn();
		closeCallback = vi.fn();
		HTMLDialogElement.prototype.showModal = showCallback;
		HTMLDialogElement.prototype.close = closeCallback;
	} );

	const getWrapper = (): VueWrapper<any> => {
		return mount( FullPageBanner, {
			props: {
				visible: false
			},
			global: {
				mocks: {
					$translate: ( key: string ): string => key
				}
			}
		} );
	};

	it( 'Shows and hides', async () => {
		const wrapper = getWrapper();

		await wrapper.setProps( { visible: true } );

		expect( showCallback ).toHaveBeenCalled();

		await wrapper.setProps( { visible: false } );

		expect( closeCallback ).toHaveBeenCalled();
	} );

	it( 'Emits events', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-close' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-full-cta-with' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-full-cta-without' ).trigger( 'click' );

		expect( wrapper.emitted( 'close' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'membershipWithAmount' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'membershipWithoutAmount' ).length ).toStrictEqual( 1 );
	} );
} );
