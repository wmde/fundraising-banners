import { beforeEach, describe, expect, it, test } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { shallowMount } from '@vue/test-utils';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import MainDonationFormPaymentsAndReceiptButtonDynamicLabel from '@src/components/DonationForm/SubComponents/SubmitButtons/MainDonationFormPaymentsAndReceiptButtonDynamicLabel.vue';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { resetFormModel } from '@test/resetFormModel';

const translate = ( key: string ): string => key;
const formModel = useFormModel();

describe( 'MainDonationFormPaymentsAndReceiptButtonDynamicLabel.vue', () => {

	beforeEach( () => resetFormModel( formModel ) );

	test.each( [
		[ AddressTypes.ANONYMOUS.value, 'submit-label-paypal' ],
		[ '', 'submit-label-paypal' ],
		[ AddressTypes.EMAIL.value, 'submit-label' ],
		[ AddressTypes.FULL.value, 'submit-label' ]
	] )( 'shows the correct label for address type %s', ( addressType: string, label: string ) => {
		formModel.addressType.value = addressType;
		formModel.paymentMethod.value = PaymentMethods.PAYPAL.value;
		formModel.customAmount.value = '9.99';

		const wrapper = shallowMount( MainDonationFormPaymentsAndReceiptButtonDynamicLabel, {
			props: {
				paymentLabelsBelowCents: 10_00
			},
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
		formModel.receipt.value = receipt;
		formModel.paymentMethod.value = PaymentMethods.PAYPAL.value;
		formModel.addressType.value = AddressTypes.ANONYMOUS.value;
		formModel.customAmount.value = '9.99';

		const wrapper = shallowMount( MainDonationFormPaymentsAndReceiptButtonDynamicLabel, {
			props: {
				paymentLabelsBelowCents: 10_00
			},
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
		formModel.addressType.value = AddressTypes.ANONYMOUS.value;
		formModel.paymentMethod.value = paymentMethod;
		formModel.customAmount.value = '9.99';

		const wrapper = shallowMount( MainDonationFormPaymentsAndReceiptButtonDynamicLabel, {
			props: {
				paymentLabelsBelowCents: 10_00
			},
			global: {
				provide: {
					translator: { translate }
				}
			}
		} );

		expect( wrapper.text() ).toStrictEqual( label );
	} );

	it( 'shows the correct label when amount is 10 or higher', () => {
		formModel.receipt.value = false;
		formModel.paymentMethod.value = PaymentMethods.PAYPAL.value;
		formModel.addressType.value = AddressTypes.ANONYMOUS.value;
		formModel.customAmount.value = '10';

		const wrapper = shallowMount( MainDonationFormPaymentsAndReceiptButtonDynamicLabel, {
			props: {
				paymentLabelsBelowCents: 10_00
			},
			global: {
				provide: {
					translator: { translate }
				}
			}
		} );

		expect( wrapper.text() ).toStrictEqual( 'submit-label' );
	} );

} );
