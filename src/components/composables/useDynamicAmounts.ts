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
 * clear the selected amount. Also, if the interval changes, and the previous interval was not empty,
 * clear the amount, to avoid any risk of the donor regularly donating more than they intended.
 */
export function useDynamicAmounts( formModel: FormModel, dynamicAmounts: DynamicFormItems[] ): Ref<FormItem[]> {
	const { customAmount, interval, selectedAmount } = formModel;

	const amounts = computed<FormItem[]>( () => {
		const intervalWithDefault = interval.value !== '' ? interval.value : Intervals.ONCE.value;
		return dynamicAmounts.find( x => x.interval === intervalWithDefault )?.amounts ?? [];
	} );

	watch( amounts, () => {
		if (
			selectedAmount.value !== '' &&
			!amounts.value.some( ( { value } ) => value === selectedAmount.value )
		) {
			selectedAmount.value = '';
		}
	} );
	watch( interval, ( _, previousInterval ) => {
		if ( previousInterval !== '' ) {
			selectedAmount.value = '';
			customAmount.value = '';
		}
	} );

	return amounts;
}
