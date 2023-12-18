import { describe, expect, test } from 'vitest';
import { useFormAction } from '@src/components/composables/useFormAction';
import { useFormModel } from '@src/components/composables/useFormModel';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

const anonymousAction: string = 'Anonymously';
const withAddressAction: string = 'WithAddress';

describe( 'useFormAction', () => {

	test.each( [
		[ '', PaymentMethods.PAYPAL.value, withAddressAction ],
		[ AddressTypes.FULL.value, PaymentMethods.PAYPAL.value, withAddressAction ],
		[ AddressTypes.EMAIL.value, PaymentMethods.PAYPAL.value, withAddressAction ],
		[ AddressTypes.ANONYMOUS.value, PaymentMethods.PAYPAL.value, anonymousAction ],
		[ AddressTypes.ANONYMOUS.value, PaymentMethods.DIRECT_DEBIT.value, withAddressAction ]
	] )( 'returns the correct action with address type', ( addressType: string, paymentMethod: string, expectedAction: string ) => {
		const formModel = useFormModel();
		formModel.addressType.value = addressType;
		formModel.paymentMethod.value = paymentMethod;

		const { formAction } = useFormAction( {
			donateAnonymouslyAction: anonymousAction,
			donateWithAddressAction: withAddressAction
		} );

		expect( formAction.value ).toBe( expectedAction );
	} );
} );
