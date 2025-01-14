import { FormActions } from '@src/domain/FormActions';
import { computed, Ref } from 'vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

export function useFormAction( formActions: FormActions, minimumAmount: number ): { formAction: Ref<string> } {
	const formModel = useFormModel();
	const formAction = computed( (): string => {

		let URL: string = formActions.donateAnonymouslyAction;

		if ( formModel.numericAmount.value >= minimumAmount || formModel.receipt.value || formModel.paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value ) {
			URL = formActions.donateWithAddressAction + '&ap=1';
		}

		return URL;
	} );

	return {
		formAction
	};
}
