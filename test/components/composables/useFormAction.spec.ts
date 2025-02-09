import { describe, expect, test } from 'vitest';
import { useFormAction } from '@src/components/composables/useFormAction';
import { useFormModel } from '@src/components/composables/useFormModel';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { FormAction, FormActionCollection } from '@src/domain/FormActions';
import { FakeTrackingParameters } from '@test/fixtures/FakeTrackingParameters';

describe( 'useFormAction', () => {

	const anonymousAction = new FormAction( 'https://example.com/donateAnonymously', new FakeTrackingParameters() );
	const withAddressAction = new FormAction( 'https://example.com/donateWithAddress', new FakeTrackingParameters() );
	const actionCollection = new FormActionCollection(
		withAddressAction,
		anonymousAction,
	);

	test.each( [
		[ '', PaymentMethods.PAYPAL.value, withAddressAction ],
		[ AddressTypes.FULL.value, PaymentMethods.PAYPAL.value, withAddressAction ],
		[ AddressTypes.EMAIL.value, PaymentMethods.PAYPAL.value, withAddressAction ],
		[ AddressTypes.ANONYMOUS.value, PaymentMethods.PAYPAL.value, anonymousAction ],
		[ AddressTypes.ANONYMOUS.value, PaymentMethods.DIRECT_DEBIT.value, withAddressAction ]
	] )( 'returns the correct action with address type', ( addressType: string, paymentMethod: string, expectedAction: FormAction ) => {
		const formModel = useFormModel();
		formModel.addressType.value = addressType;
		formModel.paymentMethod.value = paymentMethod;

		const { formAction } = useFormAction( actionCollection );

		expect( formAction.value ).toBe( expectedAction.toString() );
	} );
} );
