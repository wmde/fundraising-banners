import { FormActions } from '@src/domain/FormActions';
import { computed, Ref } from 'vue';
import { useFormModel } from '@src/components/composables/useFormModel';

export function useFormAction( formActions: FormActions, minimumAmount: number ): { formAction: Ref<string> } {
	const formModel = useFormModel();
	const formAction = computed( (): string => {

		let URL: string = formActions.donateAnonymouslyAction;

		if ( formModel.numericAmount.value >= minimumAmount || formModel.receipt.value ) {
			URL = formActions.donateWithAddressAction + '&ap=1';
		}

		return URL;
	} );

	return {
		formAction
	};
}
