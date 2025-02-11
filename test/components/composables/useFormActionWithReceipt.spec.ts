import { describe, expect, test } from 'vitest';
import { useFormActionWithReceipt } from '@src/components/composables/useFormActionWithReceipt';
import { useFormModel } from '@src/components/composables/useFormModel';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { FormAction, FormActionCollection } from '@src/domain/FormActions';
import { FakeTrackingParameters } from '@test/fixtures/FakeTrackingParameters';

const anonymousAction: string = 'Anonymously';
const withAddressAction: string = 'WithAddress';

describe( 'useFormActionWithReceipt', () => {

	const MINIMUM_AMOUNT = 10;
	const actionCollection = new FormActionCollection(
		new FormAction( withAddressAction, new FakeTrackingParameters() ),
		new FormAction( anonymousAction, new FakeTrackingParameters() )
	);

	test.each( [
		[ true, PaymentMethods.DIRECT_DEBIT.value, '10', withAddressAction, true ],
		[ true, PaymentMethods.DIRECT_DEBIT.value, '15', withAddressAction, true ],
		[ true, PaymentMethods.PAYPAL.value, '5', withAddressAction, true ],
		[ false, PaymentMethods.PAYPAL.value, '15', withAddressAction, true ],

		[ false, PaymentMethods.PAYPAL.value, '5', anonymousAction, false ],
	] )( 'returns the correct action with address type', (
		receiptNeeded: boolean,
		paymentMethod: string,
		amount: string,
		expectedAction: string,
		hasAddressParameters: boolean,
	) => {
		const formModel = useFormModel();
		formModel.receipt.value = receiptNeeded;
		formModel.paymentMethod.value = paymentMethod;
		formModel.customAmount.value = amount;

		const { formAction } = useFormActionWithReceipt(
			actionCollection,
			MINIMUM_AMOUNT
		);

		// eslint-disable-next-line security/detect-non-literal-regexp
		expect( formAction.value ).toMatch( new RegExp( `^${expectedAction}` ) );
		expect( formAction.value.includes( 'ap=1' ) ).toBe( hasAddressParameters );
	} );

} );
