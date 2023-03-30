import { beforeEach, describe, expect, it } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import SingleStepDonation from '@src/components/DonationForm/SingleStepDonation.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

const formItems: DonationFormItems = {
	addressType: [ AddressTypes.NO, AddressTypes.EMAIL ],
	amounts: [
		{ value: '1', label: '€1', className: 'amount-1' },
		{ value: '5', label: '€5', className: 'amount-5' }
	],
	intervals: [ Intervals.ONCE, Intervals.MONTHLY ],
	paymentMethods: [ PaymentMethods.PAYPAL, PaymentMethods.CREDIT_CARD ]
};

describe( 'SingleStepDonation.vue', () => {
	let wrapper: VueWrapper<any>;

	beforeEach( () => {
		wrapper = mount( SingleStepDonation, {
			props: {
				formUrl: 'https://example.com'
			},
			global: {
				provide: {
					formItems: formItems,
					currencyFormatter: ( amount: number ) => String( amount )
				},
				mocks: {
					$translate: ( key: string ) => key
				}
			}
		} );
	} );

	it( 'updates the interval when one is selected', async () => {
		await wrapper.find( '.interval-1 input' ).trigger( 'change' );

		expect( wrapper.find<HTMLInputElement>( '.wmde-banner-submit-values input[name=interval]' ).element.value ).toBe( '1' );
	} );

	it( 'updates the amount when one is selected', async () => {
		await wrapper.find( '.amount-5 input' ).trigger( 'change' );

		expect( wrapper.find<HTMLInputElement>( '.wmde-banner-submit-values input[name=amount]' ).element.value ).toBe( '5' );
	} );

	it( 'updates the amount when a custom amount is entered', async () => {
		await wrapper.find( '.wmde-banner-select-custom-amount-input' ).setValue( '42' );

		expect( wrapper.find<HTMLInputElement>( '.wmde-banner-submit-values input[name=amount]' ).element.value ).toBe( '4200' );
	} );

	it( 'updates the payment method when one is selected', async () => {
		await wrapper.find( '.payment-PPL input' ).trigger( 'change' );

		expect( wrapper.find<HTMLInputElement>( '.wmde-banner-submit-values input[name=paymentType]' ).element.value ).toBe( 'PPL' );
	} );
} );