import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ReasonsToDonate from '@src/components/ReasonsToDonate/ReasonsToDonate.vue';

describe( 'ReasonsToDonate.vue', () => {
	let showCallback: Mock;
	let closeCallback: Mock;

	beforeEach( () => {
		showCallback = vi.fn();
		closeCallback = vi.fn();
		HTMLDialogElement.prototype.showModal = showCallback;
		HTMLDialogElement.prototype.close = closeCallback;
	} );

	const getWrapper = (): VueWrapper<any> => {
		return mount( ReasonsToDonate, {
			props: {
				visible: false
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );
	};

	/**
	 * The 2 expects are explicitly commented here because jsdom doesn't support the open attribute yet
	 * If you're looking at this please uncomment them and check if support was added
	 *
	 * SEE: https://github.com/jsdom/jsdom/issues/3294
	 */
	it( 'shows and hides', async () => {
		const wrapper = getWrapper();

		await wrapper.setProps( { visible: true } );

		expect( showCallback ).toHaveBeenCalled();
		// expect( wrapper.attributes( 'open' ) ).toBeUndefined();

		await wrapper.setProps( { visible: false } );

		expect( closeCallback ).toHaveBeenCalled();
		// expect( wrapper.attributes( 'open' ) ).toStrictEqual( 'true' );
	} );

	it( 'emits events', async () => {
		const wrapper = getWrapper();

		await wrapper.setProps( { visible: true } );
		expect( wrapper.emitted( 'shown' ).length ).toStrictEqual( 1 );

		await wrapper.find( '.wmde-banner-10-reasons-close button' ).trigger( 'click' );
		expect( wrapper.emitted( 'hide' ).length ).toStrictEqual( 1 );

		await wrapper.find( '.wmde-banner-10-reasons-accordion-item:nth-child(1) .wmde-banner-10-reasons-accordion-title' ).trigger( 'click' );
		await wrapper.find( '.wmde-banner-10-reasons-accordion-item:nth-child(8) .wmde-banner-10-reasons-accordion-title' ).trigger( 'click' );

		expect( wrapper.emitted( 'accordionItemClicked' ).length ).toStrictEqual( 2 );
		expect( wrapper.emitted( 'accordionItemClicked' )[ 0 ][ 0 ] ).toStrictEqual( { itemNumber: '1' } );
		expect( wrapper.emitted( 'accordionItemClicked' )[ 1 ][ 0 ] ).toStrictEqual( { itemNumber: '8' } );

		await wrapper.find( '.wmde-banner-10-reasons-cta button' ).trigger( 'click' );
		expect( wrapper.emitted( 'callToActionClicked' ).length ).toStrictEqual( 1 );
	} );
} );
