import FormItemsBuilder, {
	CurrencyFormatter,
	DonationFormItems,
	Intervals,
	PaymentMethods
} from '@src/utils/FormItemsBuilder';
import { Translator } from '@src/Translator';

export function createFormItems( translations: Translator, amountFormatter: CurrencyFormatter ): DonationFormItems {
	const builder = new FormItemsBuilder( translations, amountFormatter );
	builder.setIntervals(
		Intervals.ONCE,
		Intervals.MONTHLY,
		Intervals.QUARTERLY,
		Intervals.YEARLY
	);
	builder.setAmounts( 5, 10, 20, 25, 50, 100 );
	builder.setPaymentMethods(
		PaymentMethods.PAYPAL,
		PaymentMethods.BANK_TRANSFER,
		PaymentMethods.DIRECT_DEBIT,
		PaymentMethods.CREDIT_CARD
	);
	return builder.getItems();
}
