import { FormActionCollection } from '@src/domain/FormActions';
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
 * @param { FormActionCollection } formActions
 * @param { number } minimumAmountInCents Threshold (in cents) at where a donation counts as "big donation" (where a receipt might be wanted)
 */
export function useFormActionWithReceipt( formActions: FormActionCollection, minimumAmountInCents: number ): { formAction: Ref<string> } {
	const formModel = useFormModel();
	const formAction = computed( (): string => {

		let action = formActions.donateAnonymouslyAction;

		if ( formModel.amountInCents.value >= minimumAmountInCents ||
			formModel.receipt.value ||
			formModel.paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value ) {
			action = formActions.donateWithAddressAction;
			// Use address page without anonymous option
			action.setParameter( 'ap', '1' );
		}

		return action.toString();
	} );

	return {
		formAction
	};
}
