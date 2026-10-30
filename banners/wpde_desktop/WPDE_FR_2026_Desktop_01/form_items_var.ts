import FormItemsBuilder from '@src/utils/FormItemsBuilder/FormItemsBuilder';
import type { Translator } from '@src/Translator';
import type { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import type { NumberFormatter } from '@src/utils/DynamicContent/formatters/NumberFormatter';

export function createFormItems( translations: Translator, amountFormatter: NumberFormatter ): DonationFormItems {
	return new FormItemsBuilder( translations, amountFormatter )
		.setIntervals(
			Intervals.ONCE,
			Intervals.MONTHLY,
			Intervals.YEARLY
		)
		.setDynamicAmounts( [
			{ interval: Intervals.ONCE.value, amounts: [ 10, 25, 50, 75, 100, 150 ] },
			{ interval: Intervals.MONTHLY.value, amounts: [ 2, 3, 5, 10, 15, 20 ] },
			{ interval: Intervals.YEARLY.value, amounts: [ 10, 25, 50, 75, 100, 150 ] },
		] )
		.setPaymentMethods(
			PaymentMethods.PAYPAL,
			PaymentMethods.BANK_TRANSFER,
			PaymentMethods.DIRECT_DEBIT
		).getItems();
}
