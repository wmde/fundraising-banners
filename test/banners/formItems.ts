import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

export const formItems: DonationFormItems = {
	addressType: [ AddressTypes.FULL, AddressTypes.ANONYMOUS, AddressTypes.EMAIL ],
	amounts: [
		{ value: '1', label: '€1', className: 'amount-1' },
		{ value: '5', label: '€5', className: 'amount-5' },
		{ value: '10', label: '€10', className: 'amount-10' },
		{ value: '20', label: '€20', className: 'amount-20' },
		{ value: '25', label: '€25', className: 'amount-25' },
		{ value: '200', label: '€200', className: 'amount-200' }
	],
	intervals: [ Intervals.ONCE, Intervals.MONTHLY, Intervals.QUARTERLY, Intervals.YEARLY ],
	paymentMethods: [ PaymentMethods.PAYPAL, PaymentMethods.CREDIT_CARD, PaymentMethods.SOFORT, PaymentMethods.DIRECT_DEBIT, PaymentMethods.BANK_TRANSFER ]
};
