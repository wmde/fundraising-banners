import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import BannerModal from '@banners/thank_you/components/BannerModal.vue';
import thankYouContent from '@test/fixtures/ThankYouContent';
import BannerDisclosure from '@banners/thank_you/components/BannerDisclosure.vue';

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
				thankYouContent,
				membershipWithAmountUrl: 'MEMBERSHIP_WITH_AMOUNT_URL',
				membershipWithoutAmountUrl: 'MEMBERSHIP_WITHOUT_AMOUNT_URL'
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

		const disclosures = wrapper.findAllComponents( BannerDisclosure );
		disclosures[ 0 ].vm.$emit( 'dialogueToggled', true );
		disclosures[ 0 ].vm.$emit( 'dialogueToggled', false );
		disclosures[ 1 ].vm.$emit( 'dialogueToggled', true );
		disclosures[ 1 ].vm.$emit( 'dialogueToggled', false );

		await wrapper.find( '.wmde-b-close-button button' ).trigger( 'click' );
		const ctaFiveEuroAmount = wrapper.find( '.wmde-b-cta > div:first-child a' );
		await ctaFiveEuroAmount.trigger( 'click' );
		const ctaOtherAmount = wrapper.find( '.wmde-b-cta > div:last-child a' );
		await ctaOtherAmount.trigger( 'click' );

		expect( wrapper.emitted( 'dialogueOpened' ).length ).toStrictEqual( 2 );
		expect( wrapper.emitted( 'dialogueOpened' )[ 0 ][ 0 ] ).toStrictEqual( 'knowledge' );
		expect( wrapper.emitted( 'dialogueOpened' )[ 1 ][ 0 ] ).toStrictEqual( 'help' );
		expect( wrapper.emitted( 'close' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'membershipWithAmount' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'membershipWithoutAmount' ).length ).toStrictEqual( 1 );
	} );
} );
