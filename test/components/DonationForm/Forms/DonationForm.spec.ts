import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import DonationForm from '@src/components/DonationForm/Forms/DonationForm.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { formFieldsAreValid } from '@src/validation/DonationFormValidator';

const formItems: DonationFormItems = {
	addressType: [ AddressTypes.NO, AddressTypes.EMAIL ],
	amounts: [
		{ value: '1', label: '€1', className: 'amount-1' },
		{ value: '5', label: '€5', className: 'amount-5' }
	],
	intervals: [ Intervals.ONCE, Intervals.MONTHLY ],
	paymentMethods: [ PaymentMethods.PAYPAL, PaymentMethods.CREDIT_CARD ]
};

vi.mock( '@src/validation/DonationFormValidator', () => {
	return {
		formFieldsAreValid: vi.fn()
	};
} );

describe( 'DonationForm.vue', () => {
	let wrapper: VueWrapper<any>;

	beforeEach( () => {
		wrapper = mount( DonationForm, {
			props: {
				formUrl: 'https://example.com',
				formItems: formItems
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
	} );

	it( 'should format amount when input field is blurred', async () => {
		const input = wrapper.find<HTMLInputElement>( '.wmde-banner-select-custom-amount-input' );

		await input.setValue( '3,14' );
		await input.trigger( 'blur' );

		expect( input.element.value ).toBe( '3.14' );
	} );

	it.todo( 'shows invalid fields on submit when fields are invalid' );

	it( 'emits an event on submit when fields are valid', () => {
		const MockDonationFormValidator = vi.mocked( formFieldsAreValid );
		MockDonationFormValidator.mockReturnValue( true );

		wrapper.trigger( 'submit' );

		expect( wrapper.emitted( 'submit' ).length ).toBe( 1 );
	} );

	it( 'does not emit our own submit event when form fields are invalid', () => {
		const MockDonationFormValidator = vi.mocked( formFieldsAreValid );

		MockDonationFormValidator.mockReturnValue( false );

		// this submit event is the submit event of the HTML form
		wrapper.trigger( 'submit' );

		// this submit event is our own named event
		expect( wrapper.emitted( 'submit' ) ).toBeUndefined();
	} );
} );
