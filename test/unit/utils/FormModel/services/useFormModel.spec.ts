import { describe, expect, it } from 'vitest';
import { useFormModel } from '@src/utils/FormModel/services/useFormModel';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { nextTick } from 'vue';

describe( 'useFormModel', () => {
	it( 'should clear the address type when payment method is set to Direct debit and address type was NO', async function () {
		const model = useFormModel();

		model.addressType.value = AddressTypes.NO.value;
		model.paymentMethod.value = PaymentMethods.DIRECT_DEBIT.value;

		await nextTick();
		expect( model.addressType.value ).toBe( '' );
	} );

	it( 'should NOT change the address type when payment method is set to Bank transfer and address type was NO', async function () {
		const model = useFormModel();

		model.addressType.value = AddressTypes.NO.value;
		model.paymentMethod.value = PaymentMethods.BANK_TRANSFER.value;

		await nextTick();
		expect( model.addressType.value ).toBe( AddressTypes.NO.value );
	} );
}
);
