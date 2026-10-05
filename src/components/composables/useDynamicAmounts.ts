import { computed, watch } from 'vue';
import type { Ref } from 'vue';
import type { FormItem } from '@src/utils/FormItemsBuilder/FormItem';
import type { FormModel } from '@src/utils/FormModel/FormModel';

/**
 * Make the amounts dynamic, based on other parts of the form model.
 *
 * If the amounts change such that the selected amount is no longer available,
 * move it into the custom amount to preserve it.
 */
export function useDynamicAmounts(
	formModel: FormModel,
	dynamicAmounts: ( formModel: FormModel ) => FormItem[],
): Ref<FormItem[]> {
	const amounts = computed( () => dynamicAmounts( formModel ) );
	const { customAmount, selectedAmount, formatCustomAmount } = formModel;
	watch( amounts, () => {
		if (
			customAmount.value === '' &&
			!amounts.value.some( ( { value } ) => value === selectedAmount.value )
		) {
			customAmount.value = selectedAmount.value;
			formatCustomAmount();
		}
	} );
	return amounts;
}
