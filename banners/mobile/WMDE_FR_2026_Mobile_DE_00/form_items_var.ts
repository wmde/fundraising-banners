import FormItemsBuilder from '@src/utils/FormItemsBuilder/FormItemsBuilder';
import type { Translator } from '@src/Translator';
import type { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import type { NumberFormatter } from '@src/utils/DynamicContent/formatters/NumberFormatter';

export function createFormItems( translations: Translator, amountFormatter: NumberFormatter ): DonationFormItems {
	return new FormItemsBuilder( translations, amountFormatter )
		.setAmounts( 5, 10, 20, 50 ).getItems();
}
