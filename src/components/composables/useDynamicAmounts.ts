import { computed, watch } from 'vue';
import type { Ref } from 'vue';
import type { FormItem } from '@src/utils/FormItemsBuilder/FormItem';
import type { FormModel } from '@src/utils/FormModel/FormModel';
import { DynamicFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';

/**
 * Make the amounts dynamic, based on other parts of the form model.
 *
 * If the amounts change such that the selected amount is no longer available,
 * move it into the custom amount to preserve it.
 */
export function useDynamicAmounts( formModel: FormModel, dynamicAmounts: DynamicFormItems[] ): Ref<FormItem[]> {
	const { customAmount, selectedAmount, formatCustomAmount } = formModel;

	const amounts = computed<FormItem[]>( () => {
		const intervalWithDefault = formModel.interval.value !== '' ? formModel.interval.value : Intervals.ONCE.value;
		return dynamicAmounts.find( x => x.interval === intervalWithDefault )?.amounts ?? [];
	} );

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
