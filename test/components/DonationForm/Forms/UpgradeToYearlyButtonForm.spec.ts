import { beforeEach, describe, expect, it } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import UpgradeToYearlyButtonForm from '@src/components/DonationForm/Forms/UpgradeToYearlyButtonForm.vue';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';

const formModel = useFormModel();

document.body.innerHTML = `<div id="app"></div>`;

describe( 'UpgradeToYearlyButtonForm.vue', () => {

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => resetFormModel( formModel ) );

	const getWrapper = (): VueWrapper<any> => {
		return shallowMount( UpgradeToYearlyButtonForm, {
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
			},
			attachTo: document.getElementById( 'app' )
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

	it( 'should emit "submit" event when user selects an interval and submits ', async function () {
		const wrapper = getWrapper();
		await wrapper.find( `button[value="${ Intervals.YEARLY.value }"]` ).trigger( 'click' );

		const emitted = wrapper.emitted( 'submit' );
		expect( emitted.length ).toBe( 1 );
		expect( emitted[ 0 ] ).toEqual( [ { pageIndex: 4, extraData: { upgradeToYearlyInterval: '12' } } ] );
	} );

	it( 'should insert the euroAmount into the translations', async () => {
		formModel.selectedAmount.value = '5';
		const wrapper = getWrapper();

		expect( wrapper.find( `button[value="${ Intervals.ONCE.value }"]` ).text() ).toContain( '{"amount":"€5"}' );
		expect( wrapper.find( `button[value="${ Intervals.YEARLY.value }"]` ).text() ).toContain( '{"amount":"€5"}' );
	} );

	it( 'should emit back event with pageIndex', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.previous' ).trigger( 'click' );

		expect( wrapper.emitted( 'previous' ).length ).toBe( 1 );
		expect( wrapper.emitted( 'previous' )[ 0 ] ).toEqual( [ { pageIndex: 4 } ] );
	} );
} );
