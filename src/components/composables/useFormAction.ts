import { FormActions } from '@src/domain/FormActions';
import { computed, Ref } from 'vue';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { useFormModel } from '@src/components/composables/useFormModel';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

/**
 * Determine which donation page the user will get sent to on submit.
 *
 * When a user wants to donate anonymously, they will get redirected to an anonymous donation.
 * When a user wants to donate via direct debit, they will have to specify their address.
 *
 * The form action should be independent of the form and only rely on the FormModel.
 * @param { FormActions }  formActions
 */
export function useFormAction( formActions: FormActions ): { formAction: Ref<string> } {
	const formModel = useFormModel();
	const formAction = computed( (): string => {
		if ( formModel.addressType.value !== AddressTypes.ANONYMOUS.value ) {
			return formActions.donateWithAddressActionUrl;
		}

		if ( formModel.paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value ) {
			return formActions.donateWithAddressActionUrl;
		}

		return formActions.donateAnonymouslyActionUrl;
	} );

	return {
		formAction
	};
}
