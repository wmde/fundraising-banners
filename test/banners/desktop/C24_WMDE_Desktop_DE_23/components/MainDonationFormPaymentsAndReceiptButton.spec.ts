import { describe, expect, test } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { shallowMount } from '@vue/test-utils';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import MainDonationFormPaymentsAndReceiptButton from '@banners/desktop/C24_WMDE_Desktop_DE_23/components/MainDonationFormPaymentsAndReceiptButton.vue';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';

const translate = ( key: string ): string => key;

describe( 'MainDonationFormPaymentsAndReceiptButton.vue', () => {
	test.each( [
		[ AddressTypes.ANONYMOUS.value, 'submit-label-paypal' ],
		[ '', 'submit-label-paypal' ],
		[ AddressTypes.EMAIL.value, 'submit-label' ],
		[ AddressTypes.FULL.value, 'submit-label' ]
	] )( 'shows the correct label for address type %s', ( addressType: string, label: string ) => {
		const formModel = useFormModel();
		formModel.addressType.value = addressType;
		formModel.paymentMethod.value = PaymentMethods.PAYPAL.value;

		const wrapper = shallowMount( MainDonationFormPaymentsAndReceiptButton, {
			global: {
				provide: {
					translator: { translate }
				}
			}
		} );

		expect( wrapper.text() ).toStrictEqual( label );
	} );

	test.each( [
		[ true, 'submit-label' ],
		[ false, 'submit-label-paypal' ],
		[ null, 'submit-label-paypal' ]
	] )( 'shows the correct label for receipt %s', ( receipt: boolean|null, label: string ) => {
		const formModel = useFormModel();
		formModel.receipt.value = receipt;
		formModel.paymentMethod.value = PaymentMethods.PAYPAL.value;
		formModel.addressType.value = AddressTypes.ANONYMOUS.value;

		const wrapper = shallowMount( MainDonationFormPaymentsAndReceiptButton, {
			global: {
				provide: {
					translator: { translate }
				}
			}
		} );

		expect( wrapper.text() ).toStrictEqual( label );
	} );

	test.each( [
		[ PaymentMethods.PAYPAL.value, 'submit-label-paypal' ],
		[ PaymentMethods.BANK_TRANSFER.value, 'submit-label-bank-transfer' ],
		[ PaymentMethods.CREDIT_CARD.value, 'submit-label-credit-card' ],
		[ PaymentMethods.SOFORT.value, 'submit-label-sofort' ],
		[ PaymentMethods.DIRECT_DEBIT.value, 'submit-label' ]
	] )( 'shows the correct label when anonymous for payment method %s', ( paymentMethod: string, label: string ) => {
		const formModel = useFormModel();
		formModel.addressType.value = AddressTypes.ANONYMOUS.value;
		formModel.paymentMethod.value = paymentMethod;

		const wrapper = shallowMount( MainDonationFormPaymentsAndReceiptButton, {
			global: {
				provide: {
					translator: { translate }
				}
			}
		} );

		expect( wrapper.text() ).toStrictEqual( label );
	} );

} );
