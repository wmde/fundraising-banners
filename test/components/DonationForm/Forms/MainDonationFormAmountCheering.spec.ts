import { describe, expect, it, test, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import DonationForm from '@src/components/DonationForm/Forms/MainDonationFormAmountCheering.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { newDonationFormValidator } from '@src/validation/DonationFormValidator';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';

const formItems: DonationFormItems = {
	addressType: [ AddressTypes.ANONYMOUS, AddressTypes.EMAIL ],
	amounts: [
		{ value: '5', label: '€5', className: 'amount-5' },
		{ value: '10', label: '€10', className: 'amount-10' },
		{ value: '20', label: '€20', className: 'amount-20' },
		{ value: '25', label: '€25', className: 'amount-25' },
		{ value: '50', label: '€50', className: 'amount-50' },
		{ value: '100', label: '€100', className: 'amount-100' }
	],
	intervals: [ Intervals.ONCE, Intervals.MONTHLY ],
	paymentMethods: [ PaymentMethods.PAYPAL, PaymentMethods.CREDIT_CARD ]
};

vi.mock( '@src/validation/DonationFormValidator', () => {
	return {
		newDonationFormValidator: vi.fn()
	};
} );

const formModel = useFormModel();
const translate = ( key: string ): string => key;

describe( 'MainDonationFormAmountCheering.vue', () => {

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => resetFormModel( formModel ) );

	const getWrapper = ( showErrorScrollLink: boolean = false ): VueWrapper<any> => {
		return mount( DonationForm, {
			props: {
				showErrorScrollLink
			},
			global: {
				mocks: {
					$translate: translate
				},
				provide: {
					currencyFormatter: new CurrencyEn(),
					formActions: { donateWithAddressAction: 'https://example.com', donateWithoutAddressAction: 'https://example.com' },
					formItems: formItems,
					translator: { translate },
					tracker: new TrackerSpy()
				}
			}
		} );
	};

	it( 'should clear selected amount when input field is focused', () => {
		const input = getWrapper().find<HTMLInputElement>( '.wmde-banner-select-custom-amount-input' );
		formModel.selectedAmount.value = '100';

		input.trigger( 'focus' );

		expect( formModel.selectedAmount.value ).toBe( '' );
	} );

	it( 'should format custom amount when custom amount input field is blurred and it has a value', async () => {
		const input = getWrapper().find<HTMLInputElement>( '.wmde-banner-select-custom-amount-input' );

		await input.setValue( '3,14' );
		await input.trigger( 'blur' );

		expect( input.element.value ).toBe( '3.14' );
	} );

	it( 'should not format custom amount to 0.00 when input field is blurred and is blank', async () => {
		const input = getWrapper().find<HTMLInputElement>( '.wmde-banner-select-custom-amount-input' );

		await input.trigger( 'blur' );

		expect( input.element.value ).toBe( '' );
	} );

	it( 'shows invalid fields on submit when fields are invalid', async () => {
		vi.mocked( newDonationFormValidator ).mockReturnValue( { validate: () => false } );
		const wrapper = getWrapper();

		await wrapper.trigger( 'submit' );

		expect( wrapper.find( '.select-interval .wmde-banner-select-group-error-message' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.select-amount .wmde-banner-select-group-error-message' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.select-payment-method .wmde-banner-select-group-error-message' ).exists() ).toBeTruthy();
	} );

	it( 'shows the error scroll link when form fields are invalid', async () => {
		vi.mocked( newDonationFormValidator ).mockReturnValue( { validate: () => false } );
		const wrapper = getWrapper( true );

		await wrapper.trigger( 'submit' );

		expect( wrapper.find( '.wmde-banner-form-button-error' ).exists() ).toBeTruthy();
	} );

	it( 'emits an event on submit when fields are valid', () => {
		vi.mocked( newDonationFormValidator ).mockReturnValue( { validate: () => true } );
		const wrapper = getWrapper();

		wrapper.trigger( 'submit' );

		expect( wrapper.emitted( 'submit' ).length ).toBe( 1 );
	} );

	it( 'does not emit our own submit event when form fields are invalid', () => {
		vi.mocked( newDonationFormValidator ).mockReturnValue( { validate: () => false } );
		const wrapper = getWrapper();

		wrapper.trigger( 'submit' );

		expect( wrapper.emitted( 'submit' ) ).toBeUndefined();
	} );

	it( 'passes payment label slots dynamically to select group', () => {
		const wrapper = mount( DonationForm, {
			props: {
				showErrorScrollLink: false
			},
			slots: {
				'label-payment-ppl': `<template #label-payment-ppl><span class="custom-label-paypal"></span></template>`,
				'label-payment-mcp': `<template #label-payment-mcp><span class="custom-label-credit-cards"></span></template>`
			},
			global: {
				mocks: {
					$translate: translate
				},
				provide: {
					currencyFormatter: new CurrencyEn(),
					formActions: { donateWithAddressAction: 'https://example.com', donateWithoutAddressAction: 'https://example.com' },
					formItems: formItems,
					translator: { translate },
					tracker: new TrackerSpy()
				}
			}
		} );

		expect( wrapper.find( '.custom-label-paypal' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.custom-label-credit-cards' ).exists() ).toBeTruthy();
	} );

	test.each( [
		[ '5', 'cheering-500' ],
		[ '10', 'cheering-1000' ],
		[ '20', 'cheering-2000' ],
		[ '25', 'cheering-2500' ],
		[ '50', 'cheering-5000' ],
		[ '100', 'cheering-10000' ],
	] )( 'shows the correct text in the cheering box', async ( amount: string, translationKey: string ) => {
		const wrapper = getWrapper();

		await wrapper.find( `.amount-${amount} input` ).trigger( 'change' );

		expect( wrapper.find( '.wmde-banner-cheering-top' ).element.textContent ).toStrictEqual( translationKey );
		expect( wrapper.find( '.wmde-banner-cheering-bottom' ).element.textContent ).toStrictEqual( translationKey );
	} );

	it( 'shows the correct custom amount cheering text', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.wmde-banner-select-custom-amount-radio' ).trigger( 'change' );

		expect( wrapper.find( '.wmde-banner-cheering-top' ).element.textContent ).toStrictEqual( 'cheering-custom' );
		expect( wrapper.find( '.wmde-banner-cheering-bottom' ).element.textContent ).toStrictEqual( 'cheering-custom' );
	} );
} );
