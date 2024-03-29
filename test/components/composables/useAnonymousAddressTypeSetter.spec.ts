import { beforeEach, describe, expect, test } from 'vitest';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { useFormModel } from '@src/components/composables/useFormModel';
import { nextTick } from 'vue';
import { resetFormModel } from '@test/resetFormModel';
import { useAnonymousAddressTypeSetter } from '@src/components/composables/useAnonymousAddressTypeSetter';

const formModel = useFormModel();
describe( 'useAnonymousAddressTypeSetter', () => {
	beforeEach( () => {
		resetFormModel( formModel );
	} );

	test.each( [
		[ PaymentMethods.PAYPAL.value, AddressTypes.ANONYMOUS.value ],
		[ PaymentMethods.SOFORT.value, AddressTypes.ANONYMOUS.value ],
		[ PaymentMethods.BANK_TRANSFER.value, AddressTypes.ANONYMOUS.value ],
		[ PaymentMethods.CREDIT_CARD.value, AddressTypes.ANONYMOUS.value ],
		[ PaymentMethods.DIRECT_DEBIT.value, '' ]
	] )( 'sets the correct address type', async ( paymentMethod: string, addressType: string ): Promise<void> => {
		useAnonymousAddressTypeSetter();

		formModel.paymentMethod.value = paymentMethod;
		await nextTick();

		expect( formModel.addressType.value ).toStrictEqual( addressType );
	} );
} );
