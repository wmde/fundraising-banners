<template>
	<form ref="form" class="wmde-b-donation-form wmde-c-flow" @submit.prevent="onSubmit" tabindex="-1">

		<p ref="error" class="wmde-b-field-amount__error" tabindex="-1" id="wmde-amount-error" v-if="amountValidity === AmountValidity.Invalid">
			{{ $translate( 'required-error' ) }}
		</p>

		<fieldset class="wmde-c-cluster" :data-play-cluster-animation="playClusterAnimation ? true : null">
			<label v-for="( formItem, index ) in formItems.amounts" :key="index" class="wmde-b-form-field" :style="{ '--index': index }">
				<input
					type="radio"
					name="select-amount"
					class="visually-hidden"
					:value="formItem.value"
					v-model="selectedAmount"
					:aria-describedby="amountValidity === AmountValidity.Invalid ? 'wmde-amount-error' : null"
					:tabindex="tabIndex()"
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
					:tabindex="tabIndex()"
					@blur="formatCustomAmount"
				>
			</label>
		</fieldset>

		<div>
			<label class="wmde-b-checkbox-toggle wmde-c-repel">
				<span>{{ $translate( 'yearly-label' ) }} <HeartIcon/></span> <input type="checkbox" v-model="isYearly">
			</label>
		</div>

		<div>
			<button class="wmde-b-button" type="submit" data-fill :tabindex="tabIndex()">
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
import HeartIcon from '@src/components/Icons/HeartIcon.vue';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';

interface Props {
	playClusterAnimation: boolean;
	isCurrentStep: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'submit' ] );

const form = ref<HTMLFormElement>( null );
const error = ref<HTMLElement>( null );
const formItems = inject<DonationFormItems>( 'formItems' );
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
		await nextTick();
		emit( 'submit' );
	} else {
		error.value.focus();
	}
};

watch( isYearly, ( newValue: boolean ) => {
	interval.value = newValue ? Intervals.YEARLY.value : Intervals.ONCE.value;
} );

watch( () => props.isCurrentStep, ( becameCurrentStep: boolean ) => {
	if ( becameCurrentStep ) {
		form.value.focus();
	}
} );

onMounted( () => {
	interval.value = Intervals.ONCE.value;
} );

const tabIndex = (): number | null => {
	return props.isCurrentStep ? null : -1;
};

</script>
