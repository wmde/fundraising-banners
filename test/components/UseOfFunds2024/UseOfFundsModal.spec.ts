import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import UseOfFundsModal from '@src/components/UseOfFunds2024/UseOfFundsModal.vue';
import { UseOfFundsContent } from '@src/domain/UseOfFunds2024/UseOfFundsContent';

const content: UseOfFundsContent = {
	accordion: { items: [], summary: '' },
	benefits: { items: [], title: '' },
	callToAction: '',
	closingParagraph: '',
	revenueComparison: { companies: { items: [], title: '' }, content: [], title: '' },
	summary: '',
	title: ''
};

describe( 'UseOfFundsModal.vue', () => {
	let showCallback: Mock;
	let closeCallback: Mock;

	beforeEach( () => {
		showCallback = vi.fn();
		closeCallback = vi.fn();
		HTMLDialogElement.prototype.showModal = showCallback;
		HTMLDialogElement.prototype.close = closeCallback;
	} );

	const getWrapper = (): VueWrapper<any> => {
		return mount( UseOfFundsModal, {
			props: {
				content,
				visible: false
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );
	};

	it( 'shows and hides', async () => {
		const wrapper = getWrapper();

		await wrapper.setProps( { visible: true } );

		expect( showCallback ).toHaveBeenCalled();

		await wrapper.setProps( { visible: false } );

		expect( closeCallback ).toHaveBeenCalled();
	} );

	it( 'emits events', async () => {
		const wrapper = getWrapper();

		await wrapper.setProps( { visible: true } );
		await wrapper.find( '.wmde-banner-funds-modal-close button' ).trigger( 'click' );
		await wrapper.find( '.call-to-action button' ).trigger( 'click' );

		expect( wrapper.emitted( 'shown' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'hide' ).length ).toStrictEqual( 1 );
		expect( wrapper.emitted( 'callToAction' ).length ).toStrictEqual( 1 );
	} );
} );
