import { FormActions } from '@src/domain/FormActions';
import { computed, Ref } from 'vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

/**
 * Determine which donation page the user will get sent to on submit.
 * It was concluded from tests that users who want to donate small amounts are less interested in getting a donation receipt,
 * so we want to spare them from that question and asking for their address with this.
 *
 * When a user either
 * wants to donate a big amount OR
 * explicitly wants a receipt OR
 * wants to pay via direct debit
 * then the user will be sent to the donation page that asks the donation receipt question (hence also about their address data).
 *
 * Else they will be redirected to an anonymous donation.
 *
 * The form action should be independent of the form and only rely on the FormModel.
 * @param { FormActions } formActions
 * @param { number } minimumAmount Threshold at where a donation counts as "big donation" (where a receipt might be wanted)
 */
export function useFormActionWithReceipt( formActions: FormActions, minimumAmount: number ): { formAction: Ref<string> } {
	const formModel = useFormModel();
	const formAction = computed( (): string => {

		let URL: string = formActions.donateAnonymouslyAction;

		if ( formModel.numericAmount.value >= minimumAmount ||
			formModel.receipt.value ||
			formModel.paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value ) {
			URL = formActions.donateWithAddressAction + '&ap=1';
		}

		return URL;
	} );

	return {
		formAction
	};
}
