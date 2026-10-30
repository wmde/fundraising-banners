<template>
	<form class="wmde-b-donation-form wmde-c-flow" @submit.prevent="onSubmit">
		<fieldset class="wmde-c-form-grid" data-layout="fifths" :data-play-cluster-animation="playClusterAnimation ? true : null">
			<label v-for="( formItem, index ) in formItems.amounts" :key="index" class="wmde-b-form-field" :style="{ '--index': index }">
				<input
					type="radio"
					name="select-amount"
					class="visually-hidden"
					:value="formItem.value"
					v-model="selectedAmount"
					:aria-describedby="amountValidity === AmountValidity.Invalid ? 'wmde-amount-error' : null"
				> {{ formItem.label }}
			</label>
			<label class="wmde-b-form-field" :style="{ '--index': formItems.amounts.length }" :class="{ 'wmde-b-form-field--checked' : customAmount !== '' }">
				<input
					type="text"
					name="select-custom-amount"
					class="wmde-b-text-radio__text"
					inputmode="decimal"
					:placeholder="$translate( 'custom-amount-placeholder' )"
					v-model="customAmount"
					:aria-describedby="amountValidity === AmountValidity.Invalid ? 'wmde-amount-error' : null"
					@blur="formatCustomAmount"
				>
			</label>
		</fieldset>

		<p class="wmde-b-field-amount__error" id="wmde-amount-error" v-if="amountValidity === AmountValidity.Invalid">
			{{ $translate( 'required-error' ) }}
		</p>

		<div>
			<label class="wmde-b-checkbox-toggle wmde-c-repel">
				<span>{{ $translate( 'yearly-label' ) }} <HeartIcon/></span> <input type="checkbox" v-model="isYearly">
			</label>
		</div>

		<div>
			<button class="wmde-b-button" type="submit" data-fill>
				{{ $translate( submitButtonLabel ) }}
			</button>
		</div>
	</form>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { useFormModel } from '@src/components/composables/useFormModel';
import { validateAmount } from '@src/validation/validateAmount';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import { Tracker } from '@src/tracking/Tracker';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import HeartIcon from '@src/components/Icons/HeartIcon.vue';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';

interface Props {
	playClusterAnimation: boolean;
}

defineProps<Props>();

const formItems = inject<DonationFormItems>( 'formItems' );
const tracker = inject<Tracker>( 'tracker' );
const formModel = useFormModel();
const { interval, selectedAmount, customAmount, amountValidity, formatCustomAmount } = formModel;
const isYearly = ref<boolean>( false );
const submitButtonLabel = computed( (): string => interval.value === Intervals.ONCE.value ? 'submit-label-short' : 'submit-label' );

const onSubmit = async (): Promise<void> => {
	formModel.amountValidity.value = validateAmount(
		formModel.amountInCents.value,
		formModel.selectedAmount.value,
		formModel.customAmount.value
	);

	if ( formModel.amountValidity.value === AmountValidity.Valid ) {
		tracker.trackEvent( new BannerSubmitEvent( 'MainDonationForm' ) );
		await nextTick();
	}
};

watch( isYearly, ( newValue: boolean ) => {
	interval.value = newValue ? '12' : '0';
} );

onMounted( () => {
	interval.value = '0';
} );

</script>
