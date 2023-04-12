import { describe, expect, it, test } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import CustomAmountForm from '@src/components/DonationForm/Forms/CustomAmountForm.vue';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';

describe( 'CustomAmountForm.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return shallowMount( CustomAmountForm, {
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

	test.each( [
		[ 0, true ],
		[ 100_000, true ],
		[ 5000, false ]
	] )( 'should show error message on blur when validation fails', async ( amount: number, showError: boolean ) => {
		const wrapper = getWrapper();
		const input = await wrapper.find( '.wmde-banner-select-custom-amount-input' );

		await input.setValue( amount );
		await input.trigger( 'blur' );

		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( showError );
	} );

	test.each( [
		[ '42', '€42' ],
		[ '42,42', '€42.42' ]
	] )( 'should format the custom amount for the button', async ( amount: string, buttonAmount: string ) => {
		const wrapper = getWrapper();
		const input = await wrapper.find( '.wmde-banner-select-custom-amount-input' );

		await input.setValue( amount );

		expect( wrapper.find( '.wmde-banner-form-button' ).text() ).toContain( `{"amount":"${buttonAmount}"}` );
	} );

	it( 'should emit back event with pageIndex', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.previous' ).trigger( 'click' );

		expect( wrapper.emitted( 'previous' ).length ).toBe( 1 );
		expect( wrapper.emitted( 'previous' )[ 0 ][ 0 ] ).toEqual( { pageIndex: 4 } );
	} );

} );
