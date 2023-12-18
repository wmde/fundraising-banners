import { watch } from 'vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';

export function useAnonymousAddressTypeSetter(): void {
	const formModel = useFormModel();
	watch( formModel.paymentMethod, () => {
		if ( formModel.paymentMethod.value !== PaymentMethods.DIRECT_DEBIT.value ) {
			formModel.addressType.value = AddressTypes.ANONYMOUS.value;
		} else {
			formModel.addressType.value = '';
		}
	} );
}
