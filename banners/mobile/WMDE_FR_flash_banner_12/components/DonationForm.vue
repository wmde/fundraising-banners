<template>
	<form class="wmde-b-form wmde-c-flow" @submit.prevent="onSubmit">
		<fieldset class="wmde-b-field-amount" :class="{ 'wmde-b-field-amount--is-custom' : customAmount !== '' }">
			<label v-for="( formItem, index ) in formItems.amounts" :key="index" :style="{ '--index': index }">
				<input
					type="radio"
					name="select-amount"
					class="visually-hidden"
					:value="formItem.value"
					v-model="selectedAmount"
					:aria-describedby="amountValidity === AmountValidity.Invalid ? 'wmde-amount-error' : null"
				> {{ formItem.label }}
			</label>
			<label :style="{ '--index': formItems.amounts.length }">
				<input
					type="text"
					name="select-custom-amount"
					inputmode="decimal"
					:placeholder="$translate( 'custom-amount-placeholder' )"
					v-model="customAmount"
					:aria-describedby="amountValidity === AmountValidity.Invalid ? 'wmde-amount-error' : null"
				>
			</label>
		</fieldset>

		<p class="wmde-b-field-amount__error" id="wmde-amount-error" v-if="amountValidity === AmountValidity.Invalid">
			{{ $translate( 'required-error' ) }}
		</p>

		<div>
			<label class="wmde-b-checkbox-toggle wmde-c-repel">
				<span>{{ $translate( 'yearly-label' ) }}</span> <input type="checkbox" v-model="isYearly">
			</label>
		</div>

		<div>
			<button type="submit">
				<template v-if="amountInCents === 0 || !currentAmountLabel">
					{{ $translate( 'submit-button' ) }}
				</template>
				<template v-else>
					{{ $translate( 'submit-button-amount', { amount: currentAmountLabel } ) }}
				</template>
			</button>
		</div>
	</form>
	<form ref="submitFormRef" :action="formActions.formAction.value" method="post">
		<input type="hidden" name="amount" :value="amountInCents"/>
		<input type="hidden" name="interval" :value="interval"/>
	</form>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { useFormModel } from '@src/components/composables/useFormModel';
import { useFormAction } from '@src/components/composables/useFormAction';
import { FormActionCollection } from '@src/domain/FormActions';
import { validateAmount } from '@src/validation/validateAmount';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import { Tracker } from '@src/tracking/Tracker';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';

interface Props {
	submitCallback?: () => void;
}

const props = withDefaults( defineProps<Props>(), {
	submitCallback: () => { /* empty */ }
} );

const formItems = inject<DonationFormItems>( 'formItems' );
const tracker = inject<Tracker>( 'tracker' );
const formModel = useFormModel();
const { interval, selectedAmount, customAmount, amountInCents, amountValidity } = formModel;
const currentAmountLabel = computed<string>( () => formItems.amounts.find( x => x.value === selectedAmount.value )?.label );
const formActions = useFormAction( inject<FormActionCollection>( 'formActions' ) );
const submitFormRef = ref<HTMLFormElement>( null );
const isYearly = ref<boolean>( false );

const onSubmit = async (): Promise<void> => {
	formModel.amountValidity.value = validateAmount(
		formModel.amountInCents.value,
		formModel.selectedAmount.value,
		formModel.customAmount.value
	);

	if ( formModel.amountValidity.value === AmountValidity.Valid ) {
		tracker.trackEvent( new BannerSubmitEvent( 'MainDonationForm' ) );
		props.submitCallback();
		await nextTick();
		submitFormRef.value.submit();
	}
};

watch( isYearly, ( newValue: boolean ) => {
	interval.value = newValue ? '12' : '0';
} );

onMounted( () => {
	interval.value = '0';
} );

</script>
