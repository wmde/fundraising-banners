import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import UpgradeToYearlyForm from '@src/components/DonationForm/Forms/UpgradeToYearlyForm.vue';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';

const formModel = useFormModel();

describe( 'UpgradeToYearlyForm.vue', () => {

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => resetFormModel( formModel ) );

	const getWrapper = (): VueWrapper<any> => {
		return shallowMount( UpgradeToYearlyForm, {
			props: {
				pageIndex: 4
			},
			global: {
				mocks: {
					$translate: ( key: string, templateTags: Record<string, string | number> = {} ) => {
						return `${key} ${JSON.stringify( templateTags )}`;
					}
				},
				provide: {
					currencyFormatter: new CurrencyEn()
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

		await wrapper.find( '.wmde-banner-sub-form' ).trigger( 'submit' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( true );
		expect( wrapper.emitted( 'submit' ) ).toBe( undefined );
	} );

	it( 'should hide the error when user selects an option', async function () {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-sub-form' ).trigger( 'submit' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( true );

		await wrapper.find( '.wmde-banner-select-group-input' ).trigger( 'change' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( false );
	} );

	it( 'should hide the error when user clicks on the "link" option', async function () {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-sub-form' ).trigger( 'submit' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( true );

		await wrapper.find( '.wmde-banner-form-upgrade-custom' ).trigger( 'click' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( false );
	} );

	it( 'should emit "submit" event when user selects an interval and submits ', async function () {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.wmde-banner-sub-form' ).trigger( 'submit' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( false );
		expect( wrapper.emitted( 'submit' ).length ).toBe( 1 );
	} );

	it( 'should submit the chosen interval when form was submitted ', async function () {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-select-group-option-no .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.wmde-banner-sub-form' ).trigger( 'submit' );

		await wrapper.find( '.wmde-banner-select-group-option-yes .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.wmde-banner-sub-form' ).trigger( 'submit' );

		expect( wrapper.emitted( 'submit' ).length ).toBe( 2 );

		const emittedSubmitEvent1 = wrapper.emitted( 'submit' )[ 0 ][ 0 ] as unknown as FormSubmitData;
		expect( emittedSubmitEvent1.extraData ).toEqual( { upgradeToYearlyInterval: '0' } );

		const emittedSubmitEvent2 = wrapper.emitted( 'submit' )[ 1 ][ 0 ] as unknown as FormSubmitData;
		expect( emittedSubmitEvent2.extraData ).toEqual( { upgradeToYearlyInterval: '12' } );
	} );

	it( 'should insert the euroAmount into the translations', async () => {
		formModel.selectedAmount.value = '5';
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-banner-form-upgrade-title' ).text() ).toContain( '{"amount":"€5"}' );
		expect( wrapper.find( '.wmde-banner-select-group-option-no .wmde-banner-select-group-label' ).text() ).toContain( '{"amount":"€5"}' );
		expect( wrapper.find( '.wmde-banner-select-group-option-yes .wmde-banner-select-group-label' ).text() ).toContain( '{"amount":"€5"}' );
	} );

	it( 'should emit back event with pageIndex', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.previous' ).trigger( 'click' );

		expect( wrapper.emitted( 'previous' ).length ).toBe( 1 );
		expect( wrapper.emitted( 'previous' )[ 0 ][ 0 ] ).toEqual( { pageIndex: 4 } );
	} );
} );
