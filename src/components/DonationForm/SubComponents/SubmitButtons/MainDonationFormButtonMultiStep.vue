<template>
	<button class="wmde-banner-form-button t-submit-main-donation" type="submit">
		{{ submitButtonLabel }}
	</button>
</template>

<script setup lang="ts">
/**
 * This Button handles displaying different labels based on
 * - interval
 * - payment type
 */

import { computed, inject } from 'vue';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Translator } from '@src/Translator';

const formModel = useFormModel();
const translator = inject<Translator>( 'translator' );
const { interval, paymentMethod } = formModel;

const submitButtonLabel = computed( (): string => {
	if ( interval.value !== Intervals.ONCE.value ) {
		return translator.translate( 'submit-label' );
	}

	if ( paymentMethod.value === PaymentMethods.SOFORT.value ) {
		return translator.translate( 'submit-label' );
	}

	return translator.translate( 'submit-label-short' );
} );
</script>
