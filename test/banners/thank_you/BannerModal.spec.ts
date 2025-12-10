import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import BannerModal from '@banners/thank_you/components/BannerModal.vue';
import thankYouContent from '@test/fixtures/ThankYouContent';

describe( 'BannerModal.vue', () => {
	let showCallback: Mock;
	let closeCallback: Mock;

	beforeEach( () => {
		showCallback = vi.fn();
		closeCallback = vi.fn();
		HTMLDialogElement.prototype.showModal = showCallback;
		HTMLDialogElement.prototype.close = closeCallback;
	} );

	const getWrapper = (): VueWrapper<any> => {
		return mount( BannerModal, {
			props: {
				visible: false,
				thankYouContent
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

	it( 'Focuses when shown', async () => {
		const wrapper = getWrapper();

		const focusable = wrapper.find<HTMLElement>( '.wmde-c-wrapper' );
		focusable.element.focus = vi.fn();

		await wrapper.setProps( { visible: true } );

		expect( focusable.element.focus ).toHaveBeenCalled();
	} );

	it( 'Emits events', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-b-close-button button' ).trigger( 'click' );
		const ctaFiveEuroAmount = wrapper.find( '.wmde-b-cta > div:first-child button' );
		await ctaFiveEuroAmount.trigger( 'click' );
		const ctaOtherAmount = wrapper.find( '.wmde-b-cta > div:last-child button' );
		await ctaOtherAmount.trigger( 'click' );

		expect( wrapper.emitted( 'close' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'membershipWithAmount' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'membershipWithoutAmount' ).length ).toStrictEqual( 1 );
	} );
} );
