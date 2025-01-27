import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import MainDonationFormReceiptAboveValue
	from '@src/components/DonationForm/Forms/MainDonationFormReceiptAboveValue.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { newDonationFormValidator } from '@src/validation/DonationFormValidator';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';

const formItems: DonationFormItems = {
	addressType: [],
	amounts: [
		{ value: '1', label: '€1', className: 'amount-1' },
		{ value: '5', label: '€5', className: 'amount-5' }
	],
	intervals: [ Intervals.ONCE, Intervals.MONTHLY ],
	paymentMethods: [ PaymentMethods.PAYPAL, PaymentMethods.CREDIT_CARD, PaymentMethods.DIRECT_DEBIT ]
};

vi.mock( '@src/validation/DonationFormValidator', () => {
	return {
		newDonationFormValidator: vi.fn()
	};
} );

const formModel = useFormModel();
const translate = ( key: string ): string => key;

describe( 'MainDonationFormReceiptAboveValue.vue', () => {

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => resetFormModel( formModel ) );

	const getWrapper = ( showErrorScrollLink: boolean = false ): VueWrapper<any> => {
		return mount( MainDonationFormReceiptAboveValue, {
			props: {
				showErrorScrollLink,
				showReceiptCheckboxBelow: 10
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
			},
			attachTo: document.body
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
		const wrapper = mount( MainDonationFormReceiptAboveValue, {
			props: {
				showErrorScrollLink: false,
				showReceiptCheckboxBelow: 10
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

	it( 'sets the address type to anonymous when mounted', async () => {
		expect( formModel.addressType.value ).toStrictEqual( '' );
		getWrapper();
		expect( formModel.addressType.value ).toStrictEqual( AddressTypes.ANONYMOUS.value );
	} );

	it( 'shows the donation receipt checkbox', async () => {
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-banner-form-donation-receipt-checkbox' ).exists() ).toBeFalsy();

		await wrapper.find( '.interval-0 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.amount-5 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.payment-ppl .wmde-banner-select-group-input' ).trigger( 'change' );

		expect( wrapper.find( '.wmde-banner-form-donation-receipt-checkbox' ).exists() ).toBeTruthy();
	} );

	it( 'does not show the donation receipt checkbox when address type is direct debit', async () => {
		const wrapper = getWrapper();

		expect( wrapper.find( '.wmde-banner-form-donation-receipt-checkbox' ).exists() ).toBeFalsy();

		await wrapper.find( '.interval-0 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.amount-5 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.payment-bez .wmde-banner-select-group-input' ).trigger( 'change' );

		expect( wrapper.find( '.wmde-banner-form-donation-receipt-checkbox' ).exists() ).toBeFalsy();
	} );

	it( 'updates the form model receipt', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.interval-0 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.amount-5 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.payment-ppl .wmde-banner-select-group-input' ).trigger( 'change' );

		expect( formModel.receipt.value ).toStrictEqual( false );

		await wrapper.find( '#wmde-banner-form-donation-receipt' ).trigger( 'click' );

		expect( formModel.receipt.value ).toStrictEqual( true );

		await wrapper.find( '#wmde-banner-form-donation-receipt' ).trigger( 'click' );

		expect( formModel.receipt.value ).toStrictEqual( false );
	} );

	it( 'clears the receipt option when radio field becomes hidden', async () => {
		const wrapper = getWrapper();

		await wrapper.find( '.interval-0 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.amount-5 .wmde-banner-select-group-input' ).trigger( 'change' );
		await wrapper.find( '.payment-ppl .wmde-banner-select-group-input' ).trigger( 'change' );

		expect( formModel.receipt.value ).toStrictEqual( false );

		await wrapper.find( '#wmde-banner-form-donation-receipt' ).trigger( 'click' );

		expect( formModel.receipt.value ).toStrictEqual( true );

		await wrapper.find( '.payment-bez .wmde-banner-select-group-input' ).trigger( 'change' );

		expect( formModel.receipt.value ).toStrictEqual( false );
	} );
} );
