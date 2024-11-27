import { describe, expect, it, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import DonationForm from '@src/../banners/mobile/C24_WMDE_Mobile_DE_10/MainDonationForm_changesAmountOptions.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { newDonationFormValidator } from '@src/validation/DonationFormValidator';
import { useFormModel } from '@src/components/composables/useFormModel';
import { resetFormModel } from '@test/resetFormModel';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import { TrackerSpy } from '@test/fixtures/TrackerSpy';
import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';

const formItems: DonationFormItems = {
	addressType: [ AddressTypes.ANONYMOUS, AddressTypes.EMAIL ],
	intervals: [ Intervals.ONCE, Intervals.MONTHLY ],
	amounts: [],
	paymentMethods: [ PaymentMethods.PAYPAL, PaymentMethods.CREDIT_CARD ]
};

const amounts: FormItem[] = [
	{ value: '1', label: '1 €', className: 'amount-1' },
	{ value: '5', label: '5 €', className: 'amount-5' },
	{ value: '10', label: '10 €', className: 'amount-10' },
	{ value: '20', label: '20 €', className: 'amount-20' },
	{ value: '25', label: '25 €', className: 'amount-25' }
];

vi.mock( '@src/validation/DonationFormValidator', () => {
	return {
		newDonationFormValidator: vi.fn()
	};
} );

const formModel = useFormModel();
const translate = ( key: string ): string => key;

describe( 'MainDonationForm_changesAmountOptions.vue', () => {

	// The model values are in the global scope, and they need to be reset before each test
	beforeEach( () => resetFormModel( formModel ) );

	const getWrapper = ( showErrorScrollLink: boolean = false ): VueWrapper<any> => {
		return mount( DonationForm, {
			props: {
				showErrorScrollLink,
				amountsForFormItems: amounts
			},
			global: {
				mocks: {
					$translate: translate
				},
				provide: {
					currencyFormatter: new CurrencyDe(),
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

		expect( input.element.value ).toBe( '3,14' );
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
				showErrorScrollLink: false,
				amountsForFormItems: amounts
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
					currencyFormatter: new CurrencyDe(),
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

	it( 'renders amount FormItems that got passed in as a property', () => {
		vi.mocked( newDonationFormValidator ).mockReturnValue( { validate: () => false } );
		const wrapper = getWrapper();

		expect( wrapper.find( '.amount-1' ).exists() ).toBeTruthy();
		expect( wrapper.find( '.amount-5' ).exists() ).toBeTruthy();
	} );
} );
