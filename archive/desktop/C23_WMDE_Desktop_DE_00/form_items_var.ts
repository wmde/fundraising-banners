import FormItemsBuilder from '@src/utils/FormItemsBuilder/FormItemsBuilder';
import { Translator } from '@src/Translator';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { NumberFormatter } from '@src/utils/DynamicContent/formatters/NumberFormatter';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';

export function createFormItems( translations: Translator, amountFormatter: NumberFormatter ): DonationFormItems {
	return new FormItemsBuilder( translations, amountFormatter )
		.setIntervals(
			Intervals.ONCE,
			Intervals.MONTHLY,
			Intervals.QUARTERLY,
			Intervals.YEARLY
		)
		.setAmounts( 5, 10, 20, 25, 50, 100 )
		.setPaymentMethods(
			PaymentMethods.PAYPAL,
			PaymentMethods.BANK_TRANSFER,
			PaymentMethods.DIRECT_DEBIT,
			PaymentMethods.CREDIT_CARD
		)
		.setAddressTypes(
			AddressTypes.FULL,
			AddressTypes.EMAIL,
			AddressTypes.ANONYMOUS
		)
		.getItems();
}