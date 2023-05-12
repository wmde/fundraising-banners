import { describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import AlreadyDonatedModal from '@src/components/AlreadyDonatedModal/AlreadyDonatedModal.vue';

describe( 'AlreadyDonatedModal', () => {

	const getWrapper = (): VueWrapper<any> => {
		return mount( AlreadyDonatedModal, {
			global: {
				mocks: {
					$translate: ( key: string ) => key
				}
			},
			props: {
				isVisible: true
			}
		} );
	};

	it( 'should emit "maybeLater" event when user clicks "maybe later" button', function () {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-already-donated-button-maybe-later' ).trigger( 'click' );

		expect( wrapper.emitted( 'maybeLater' ).length ).toBe( 1 );
	} );

	it( 'should emit "goAway" event when user clicks "enough for this year" button', function () {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-already-donated-button-go-away' ).trigger( 'click' );

		expect( wrapper.emitted( 'goAway' ).length ).toBe( 1 );
	} );

	it( 'should emit "hideAlreadyDonatedModal" event when user clicks the X button', function () {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-already-donated .wmde-banner-close' ).trigger( 'click' );

		expect( wrapper.emitted( 'hideAlreadyDonatedModal' ).length ).toBe( 1 );
	} );

} );
