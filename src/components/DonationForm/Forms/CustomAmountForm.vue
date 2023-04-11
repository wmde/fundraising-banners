<template>

	<div class="wmde-banner-form-step-3">

		<div class="wmde-banner-form-step-3-title">
			<a tabIndex="-1" href="banners/wikipedia.de/desktop/components/MultiStepDonationForm#" class="previous"
					@click="$emit( 'previous' )">
				<ChevronLeftIcon/>
			</a>
		</div>

		<div :class="[
				'wmde-banner-select-group-container',
				{ 'wmde-banner-select-group-container--with-error': amountValidity === AmountValidity.Invalid }
            ]">
		<p class="wmde-banner-form-step-3-header">
			{{ $translate( 'form-step-3-header' ) }}
		</p>
		<p class="wmde-banner-form-step-3-notice">
			{{ $translate( 'form-step-3-copy' ) }}
		</p>
		<div class="wmde-banner-select-custom-amount-input-container wmde-banner-form-step-3-input-container">
			<span class="wmde-banner-select-custom-amount-euro-symbol">&euro;</span>
			<input type="text"
					tabIndex="-1"
					v-model="amount"
					@blur="onBlur"
					size="3"
					maxLength="8"
					autoComplete="off"
					class="wmde-banner-select-custom-amount-input t-custom-amount-annual-upgrade"/>
		</div>
		<span class="wmde-banner-select-group-error-message">
				<span class="wmde-banner-error-icon">
					{{ $translate( 'form-step-3-error' ) }}
				</span>
			</span>
	</div>

	<div class="wmde-banner-form-button-container form-step-3-button">
		<button tabIndex="-1" class="wmde-banner-form-button t-submit-custom-amount" @click="onSubmit">
			{{
				numericAmount > 0 ?
					$translate( 'form-step-3-button', { amount } ) :
					$translate( 'form-step-3-button-blank' )
			}}
		</button>
	</div>
	</div>

</template>

<script setup lang="ts">

import { computed, inject, ref } from 'vue';
import { parseFloatFromFormattedString } from '@src/utils/parseFloatFromFormattedString';
import { validateAmount } from '@src/validation/validateAmount';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';

interface Props {
	pageIndex: number
}
const props = defineProps<Props>();
const emit = defineEmits( [ 'submit', 'previous' ] );

const amount = ref<string>( null );
const amountValidity = ref<AmountValidity>( AmountValidity.Unset );
const numericAmount = computed( (): number => parseFloatFromFormattedString( amount.value ) );

const currencyFormatter: Function = inject( 'currencyFormatter' );
const onBlur = (): void => {
	amountValidity.value = validateAmount( numericAmount.value, '', amount.value );
	amount.value = currencyFormatter( numericAmount );
};

const onSubmit = (): void => {
	amountValidity.value = validateAmount( numericAmount.value, '', amount.value );
	if ( amountValidity.value === AmountValidity.Valid ) {
		emit( 'submit', { event: 'submit', pageIndex: props.pageIndex, extraData: { newCustomAmount: amount.value } } );
	}
};

</script>
