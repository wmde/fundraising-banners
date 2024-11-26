import { describe, expect, test } from 'vitest';
import { useFormModel } from '@src/components/composables/useFormModel';
import { shallowMount } from '@vue/test-utils';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import MainDonationFormPaymentsAndReceiptButton from '@src/components/DonationForm/Forms/MainDonationFormPaymentsAndReceiptButton.vue';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';

const translate = ( key: string ): string => key;

describe( 'MainDonationFormPaymentsAndReceiptButton.vue', () => {

	test.each( [
		[ Intervals.ONCE.value, 'submit-label-short' ],
		[ Intervals.MONTHLY.value, 'submit-label' ],
		[ Intervals.BIANNUAL.value, 'submit-label' ],
		[ Intervals.YEARLY.value, 'submit-label' ],
		[ Intervals.QUARTERLY.value, 'submit-label' ]
	] )( 'shows the correct label for interval %i', ( interval: string, label: string ) => {
		const formModel = useFormModel();
		formModel.interval.value = interval;
		formModel.addressType.value = interval;
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
		[ AddressTypes.ANONYMOUS.value, 'submit-label-paypal' ],
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
		[ PaymentMethods.PAYPAL.value, 'submit-label-paypal' ],
		[ PaymentMethods.BANK_TRANSFER.value, 'submit-label-bank-transfer' ],
		[ PaymentMethods.CREDIT_CARD.value, 'submit-label-credit-card' ],
		[ PaymentMethods.SOFORT.value, 'submit-label-sofort' ],
		[ PaymentMethods.DIRECT_DEBIT.value, 'submit-label' ]
	] )( 'shows the correct label when anonymous for payment method %s', ( paymentMethod: string, label: string ) => {
		const formModel = useFormModel();
		formModel.interval.value = Intervals.MONTHLY.value;
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
