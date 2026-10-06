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
			Intervals.QUARTERLY,
			Intervals.YEARLY
		)
		.setDynamicAmounts( [
			{ interval: Intervals.ONCE.value, amounts: [ 5, 10, 20, 25, 50, 100 ] },
			{ interval: Intervals.MONTHLY.value, amounts: [ 2, 5, 10, 15, 20 ] },
			{ interval: Intervals.QUARTERLY.value, amounts: [ 5, 10, 15, 25, 50 ] },
			{ interval: Intervals.YEARLY.value, amounts: [ 5, 10, 20, 25, 50, 100 ] },
		] )
		.setPaymentMethods(
			PaymentMethods.PAYPAL,
			PaymentMethods.CREDIT_CARD,
			PaymentMethods.DIRECT_DEBIT,
			PaymentMethods.BANK_TRANSFER
		).getItems();
}
