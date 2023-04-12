<template>
	<form @submit.prevent="onSubmit" class="wmde-banner-sub-form wmde-banner-form-new-custom-amount">

		<div class="wmde-banner-form-new-custom-amount-title">
			<a tabIndex="-1" href="banners/wikipedia.de/desktop/components/MultiStepDonationForm#" class="previous"
					@click.prevent="$emit( 'previous' )">
				<ChevronLeftIcon/>
			</a>
		</div>

		<div :class="[
			'wmde-banner-form-new-custom-amount-content',
			{ 'wmde-banner-select-group-container--with-error': amountValidity === AmountValidity.Invalid }
		]">
		<p class="wmde-banner-form-new-custom-amount-header">
			{{ $translate( 'new-custom-amount-header' ) }}
		</p>
		<p class="wmde-banner-form-new-custom-amount-notice">
			{{ $translate( 'new-custom-amount-copy' ) }}
		</p>
		<div class="wmde-banner-select-custom-amount-input-container wmde-banner-form-new-custom-amount-input-container">
			<span class="wmde-banner-select-custom-amount-euro-symbol">&euro;</span>
			<input
				type="text"
				tabIndex="-1"
				v-model="amount"
				@blur="onBlur"
				size="3"
				maxLength="8"
				autoComplete="off"
				class="wmde-banner-select-custom-amount-input t-custom-amount-annual-upgrade"
			/>
		</div>
		<span v-if="!isValidOrUnset( amountValidity )" class="wmde-banner-select-group-error-message">
			<span class="wmde-banner-error-icon">
				{{ $translate( 'new-custom-amount-error' ) }}
			</span>
		</span>
	</div>

	<div class="wmde-banner-form-button-container form-new-custom-amount-button">
		<button tabIndex="-1" class="wmde-banner-form-button t-submit-custom-amount" type="submit">
			{{
				numericAmount > 0 ?
					$translate( 'new-custom-amount-button', { amount: buttonAmount } ) :
					$translate( 'new-custom-amount-button-blank' )
			}}
		</button>
	</div>
	</form>

</template>

<script setup lang="ts">

import { computed, inject, ref } from 'vue';
import { parseFloatFromFormattedString } from '@src/utils/parseFloatFromFormattedString';
import { validateAmount } from '@src/validation/validateAmount';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import { isValidOrUnset } from '@src/components/DonationForm/Forms/isValidOrUnset';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';

interface Props {
	pageIndex: number
}
const props = defineProps<Props>();
const emit = defineEmits( [ 'submit', 'previous' ] );

const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const amount = ref<string>( '' );
const amountValidity = ref<AmountValidity>( AmountValidity.Unset );
const numericAmount = computed( (): number => parseFloatFromFormattedString( amount.value ) );
const buttonAmount = computed( () => currencyFormatter.euroAmount( numericAmount.value ) );

const onBlur = (): void => {
	amountValidity.value = validateAmount( numericAmount.value, '', amount.value );
	amount.value = currencyFormatter.customAmountInput( numericAmount.value );
};

const onSubmit = (): void => {
	amountValidity.value = validateAmount( numericAmount.value, '', amount.value );
	if ( amountValidity.value === AmountValidity.Valid ) {
		emit( 'submit', { pageIndex: props.pageIndex, extraData: { newCustomAmount: amount.value } } );
	}
};

</script>

<style lang="scss">
.wmde-banner {
	&-form-new-custom-amount {
		&-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			flex-grow: 1;
		}
	}
}
</style>
