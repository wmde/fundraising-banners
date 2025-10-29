import { describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import FooterAlreadyDonated from '@src/components/Footer/FooterAlreadyDonated.vue';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';

describe( 'FooterAlreadyDonated.vue', () => {
	let tracker: TrackerSpy;
	const getWrapper = (): VueWrapper<any> => {
		tracker = new TrackerSpy();
		return shallowMount( FooterAlreadyDonated, {
			global: {
				mocks: {
					$translate: ( key: string ) => key
				},
				provide: {
					tracker
				}
			}
		} );
	};

	it( 'emits event when use of funds link is clicked', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-footer-usage-link' ).trigger( 'click' );

		expect( wrapper.emitted( 'showFundsModal' ).length ).toBe( 1 );
	} );

	it( 'emits event when already donated link is clicked', () => {
		const wrapper = getWrapper();

		wrapper.find( '.wmde-banner-footer-already-donated' ).trigger( 'click' );

		expect( wrapper.emitted( 'clickedAlreadyDonatedLink' ).length ).toBe( 1 );
	} );

} );
