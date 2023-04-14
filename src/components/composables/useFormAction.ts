import { FormActions } from '@src/domain/FormActions';
import { computed, Ref } from 'vue';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { useFormModel } from '@src/components/composables/useFormModel';

export function useFormAction( formActions: FormActions ): { formAction: Ref<string> } {
	const formModel = useFormModel();
	const formAction = computed( (): string => {
		return formModel.addressType.value === AddressTypes.ANONYMOUS.value ?
			formActions.donateAnonymouslyAction :
			formActions.donateWithAddressAction;
	} );

	return {
		formAction
	};
}
