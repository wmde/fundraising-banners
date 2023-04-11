import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import UpgradeToYearly from '@src/components/DonationForm/Forms/UpgradeToYearly.vue';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';

describe( 'UpgradeToYearly.vue', () => {
	it( 'should emit "previous" event when back button is clicked', async () => {
		const wrapper = shallowMount( UpgradeToYearly, {
			props: {
				pageNumber: 4
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				},
				provide: {
					currencyFormatter: ( amount: number ) => String( amount )
				}
			}
		} );

		await wrapper.find( '.previous' ).trigger( 'click' );

		expect( wrapper.emitted( 'previous' ).length ).toBe( 1 );
	} );

	it( 'should emit "next" event with payload when user wants to donate yearly with different amount', async () => {
		const wrapper = shallowMount( UpgradeToYearly, {
			props: {
				pageNumber: 4
			},
			global: {
				mocks: {
					$translate: ( key: string ) => key
				},
				provide: {
					currencyFormatter: ( amount: number ) => String( amount )
				}
			}
		} );

		await wrapper.find( '.wmde-banner-form-upgrade-custom' ).trigger( 'click' );

		expect( wrapper.emitted( 'next' ).length ).toBe( 1 );
		const emittedNextEvent = wrapper.emitted( 'next' )[ 0 ][ 0 ] as unknown as FormSubmitData;
		expect( emittedNextEvent.extraData ).toEqual( { upgradeToYearlyInterval: '12' } );
	} );

} );
