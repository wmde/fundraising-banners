<template>
	<button class="wmde-banner-form-button t-submit-main-donation" type="submit">
		{{ submitButtonLabel }}
	</button>
</template>

<script setup lang="ts">
/**
 * This Button handles displaying different labels based on
 * - the receipt checkbox input
 * - address type (anonymous)
 * - threshold for the amount
 * - payment type
 */

import { computed, inject } from 'vue';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Translator } from '@src/Translator';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
interface Props {
	paymentLabelsBelowCents: number;
}
const props = defineProps<Props>();
const formModel = useFormModel();
const translator = inject<Translator>( 'translator' );
const { paymentMethod, addressType, receipt, amountInCents } = formModel;
const submitButtonLabel = computed( (): string => {
	if ( amountInCents.value < props.paymentLabelsBelowCents && !receipt.value && [ AddressTypes.ANONYMOUS.value, '' ].includes( addressType.value ) ) {
		if ( paymentMethod.value === PaymentMethods.PAYPAL.value ) {
			return translator.translate( 'submit-label-paypal' );
		} else if ( paymentMethod.value === PaymentMethods.CREDIT_CARD.value ) {
			return translator.translate( 'submit-label-credit-card' );
		} else if ( paymentMethod.value === PaymentMethods.SOFORT.value ) {
			return translator.translate( 'submit-label-sofort' );
		} else if ( paymentMethod.value === PaymentMethods.BANK_TRANSFER.value ) {
			return translator.translate( 'submit-label-bank-transfer' );
		}
	}
	return translator.translate( 'submit-label' );
} );
</script>
