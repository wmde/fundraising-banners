import { describe, expect, it, test } from 'vitest';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import CustomAmountForm from '@src/components/DonationForm/Forms/CustomAmountForm.vue';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';

describe( 'CustomAmountForm.vue', () => {
	const getWrapper = (): VueWrapper<any> => {
		return shallowMount( CustomAmountForm, {
			props: {
				pageIndex: 4
			},
			global: {
				mocks: {
					$translate: ( key: string, templateTags: Record<string, string | number> = {} ) => {
						return `${ key } ${ JSON.stringify( templateTags ) }`;
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
		[ '42,42', '€42.42' ],
		[ '42,40', '€42.40' ]
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

	it( 'should clear new custom amount input when previous event is emitted', async () => {
		const wrapper = getWrapper();
		const input = await wrapper.find<HTMLInputElement>( '.wmde-banner-select-custom-amount-input' );

		await input.setValue( '34.34' );
		await wrapper.find( '.previous' ).trigger( 'click' );

		expect( input.element.value ).toBe( '' );
	} );

	it( 'should emit "submit" event with new amount', async function () {
		const wrapper = getWrapper();
		const input = await wrapper.find( '.wmde-banner-select-custom-amount-input' );

		await input.setValue( '56,789' );
		await wrapper.trigger( 'submit' );

		expect( wrapper.emitted( 'submit' ).length ).toBe( 1 );

		const emittedSubmitEvent = wrapper.emitted( 'submit' )[ 0 ][ 0 ] as unknown as FormSubmitData;

		expect( emittedSubmitEvent.extraData ).toEqual( { newCustomAmount: '56.79' } );
	} );

	it( 'should emit "submit" event with new amount', async function () {
		const wrapper = getWrapper();
		const input = await wrapper.find( '.wmde-banner-select-custom-amount-input' );

		await input.setValue( '0' );
		await wrapper.trigger( 'submit' );

		expect( wrapper.emitted( 'submit' ) ).toBe( undefined );
		expect( wrapper.find( '.wmde-banner-select-group-error-message' ).exists() ).toBe( true );
	} );

} );