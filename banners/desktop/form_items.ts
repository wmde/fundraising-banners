import FormItemsBuilder from '@src/utils/FormItemsBuilder/FormItemsBuilder';
import { Translator } from '@src/Translator';
import { CurrencyFormatter } from '@src/utils/DynamicContent/formatters/Currency';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

export function createFormItems( translations: Translator, amountFormatter: CurrencyFormatter ): DonationFormItems {
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
		).getItems();
}
