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
			{ interval: Intervals.MONTHLY.value, amounts: [ 2, 5, 10, 15, 25 ] },
			{ interval: Intervals.QUARTERLY.value, amounts: [ 5, 10, 15, 25, 50 ] },
			{
				interval: Intervals.ONCE.value,
				initialAmount: '10',
				amounts: [ 10, 15, 25, 50, 100 ]
			},
			{
				interval: Intervals.ONCE.value,
				initialAmount: '',
				amounts: [ 5, 15, 25, 50, 100 ]
			},
			{
				interval: Intervals.YEARLY.value,
				initialAmount: '10',
				amounts: [ 10, 15, 25, 50, 100 ]
			},
			{
				interval: Intervals.YEARLY.value,
				initialAmount: '',
				amounts: [ 5, 15, 25, 50, 100 ]
			}
		] )
		.setPaymentMethods(
			PaymentMethods.PAYPAL,
			PaymentMethods.DIRECT_DEBIT,
			PaymentMethods.BANK_TRANSFER,
			PaymentMethods.CREDIT_CARD
		).getItems();
}
