<template>
	<button class="wmde-banner-form-button t-submit-main-donation" type="submit">
		{{ submitButtonLabel }}
	</button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Translator } from '@src/Translator';

const formModel = useFormModel();
const translator = inject<Translator>( 'translator' );
const { interval, paymentMethod } = formModel;

const submitButtonLabel = computed( (): string => {
	return interval.value === Intervals.ONCE.value && paymentMethod.value !== PaymentMethods.SOFORT.value ?
		translator.translate( 'submit-label-short' ) :
		translator.translate( 'submit-label' );

} );
</script>
