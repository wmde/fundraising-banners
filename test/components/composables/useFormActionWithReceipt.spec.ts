import { describe, expect, test } from 'vitest';
import { useFormActionWithReceipt } from '@src/components/composables/useFormActionWithReceipt';
import { useFormModel } from '@src/components/composables/useFormModel';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

const anonymousAction: string = 'Anonymously';
const withAddressAction: string = 'WithAddress';

describe( 'useFormActionWithReceipt', () => {

	test.each( [
		[ true, PaymentMethods.DIRECT_DEBIT.value, '10', withAddressAction+'&ap=1' ],
		[ true, PaymentMethods.DIRECT_DEBIT.value, '15', withAddressAction+'&ap=1' ],
		[ true, PaymentMethods.PAYPAL.value, '5', withAddressAction+'&ap=1' ],
		[ false, PaymentMethods.PAYPAL.value, '15', withAddressAction+'&ap=1' ],

		[ false, PaymentMethods.PAYPAL.value, '5', anonymousAction ],
	] )( 'returns the correct action with address type', (
		receiptNeeded: boolean,
		paymentMethod: string,
		amount: string,
		expectedAction: string
	) => {
		const formModel = useFormModel();
		formModel.receipt.value = receiptNeeded;
		formModel.paymentMethod.value = paymentMethod;
		formModel.customAmount.value = amount;

		const { formAction } = useFormActionWithReceipt(
			{
				donateAnonymouslyActionUrl: anonymousAction,
				donateWithAddressActionUrl: withAddressAction
			},
			10
		);

		expect( formAction.value ).toBe( expectedAction );
	} );

} );
