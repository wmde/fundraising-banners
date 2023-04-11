import { describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import UpgradeToYearly from '@src/components/DonationForm/Forms/UpgradeToYearly.vue';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';

describe( 'UpgradeToYearly.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return shallowMount( UpgradeToYearly, {
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
	};

	it( 'should emit "previous" event when back button is clicked', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.previous' ).trigger( 'click' );

		expect( wrapper.emitted( 'previous' ).length ).toBe( 1 );
	} );

	it( 'should emit "next" event with payload when user wants to donate yearly with different amount', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-form-upgrade-custom' ).trigger( 'click' );

		expect( wrapper.emitted( 'next' ).length ).toBe( 1 );
		const emittedNextEvent = wrapper.emitted( 'next' )[ 0 ][ 0 ] as unknown as FormSubmitData;
		expect( emittedNextEvent.extraData ).toEqual( { upgradeToYearlyInterval: '12' } );
	} );

	it( 'should show an error when user does not select any interval ', async function () {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-form-button' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( true );
		expect( wrapper.emitted( 'submit' ) ).toBe( undefined );
	} );

	it( 'should emit "submit" event when user selects an interval and submits ', async function () {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.wmde-banner-form-button' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( false );
		expect( wrapper.emitted( 'submit' ).length ).toBe( 1 );
	} );

	it( 'should submit the chosen interval when form was submitted ', async function () {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-select-group-option-no .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.wmde-banner-form-button' ).trigger( 'click' );

		await wrapper.find( '.wmde-banner-select-group-option-yes .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.wmde-banner-form-button' ).trigger( 'click' );

		expect( wrapper.emitted( 'submit' ).length ).toBe( 2 );

		const emittedSubmitEvent1 = wrapper.emitted( 'submit' )[ 0 ][ 0 ] as unknown as FormSubmitData;
		expect( emittedSubmitEvent1.extraData ).toEqual( { upgradeToYearlyInterval: '0' } );

		const emittedSubmitEvent2 = wrapper.emitted( 'submit' )[ 1 ][ 0 ] as unknown as FormSubmitData;
		expect( emittedSubmitEvent2.extraData ).toEqual( { upgradeToYearlyInterval: '12' } );
	} );
} );
