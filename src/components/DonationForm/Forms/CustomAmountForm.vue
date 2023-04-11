<template>
	<div class="wmde-banner-sub-form wmde-banner-form-new-custom-amount">

		<div class="wmde-banner-form-new-custom-amount-title">
			<a tabIndex="-1" href="banners/wikipedia.de/desktop/components/MultiStepDonationForm#" class="previous"
					@click.prevent="$emit( 'previous' )">
				<ChevronLeftIcon/>
			</a>
		</div>

		<div :class="[
				'wmde-banner-select-group-container',
				{ 'wmde-banner-select-group-container--with-error': amountValidity === AmountValidity.Invalid }
            ]">
		<p class="wmde-banner-form-new-custom-amount-header">
			{{ $translate( 'form-new-custom-amount-header' ) }}
		</p>
		<p class="wmde-banner-form-new-custom-amount-notice">
			{{ $translate( 'form-new-custom-amount-copy' ) }}
		</p>
		<div class="wmde-banner-select-custom-amount-input-container wmde-banner-form-new-custom-amount-input-container">
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
					{{ $translate( 'form-new-custom-amount-error' ) }}
				</span>
			</span>
	</div>

	<div class="wmde-banner-form-button-container form-new-custom-amount-button">
		<button tabIndex="-1" class="wmde-banner-form-button t-submit-custom-amount" @click="onSubmit">
			{{
				numericAmount > 0 ?
					$translate( 'form-new-custom-amount-button', { amount } ) :
					$translate( 'form-new-custom-amount-button-blank' )
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
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';

interface Props {
	pageIndex: number
}
const props = defineProps<Props>();
const emit = defineEmits( [ 'submit', 'previous' ] );

const amount = ref<string>( '' );
const amountValidity = ref<AmountValidity>( AmountValidity.Unset );
const numericAmount = computed( (): number => parseFloatFromFormattedString( amount.value ) );

const currencyFormatter: Function = inject( 'currencyFormatter' );
const onBlur = (): void => {
	amountValidity.value = validateAmount( numericAmount.value, '', amount.value );
	amount.value = currencyFormatter( numericAmount.value );
};

const onSubmit = (): void => {
	amountValidity.value = validateAmount( numericAmount.value, '', amount.value );
	if ( amountValidity.value === AmountValidity.Valid ) {
		emit( 'submit', { event: 'submit', pageIndex: props.pageIndex, extraData: { newCustomAmount: amount.value } } );
	}
};

</script>

<style lang="scss">
.wmde-banner {
	&-form-new-custom-amount-title {
		&-title {
			width: 100%;
			display: block;
		}

		&-options {
			width: 100%;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
		}

		&-field {
			flex-grow: 1;
		}

		.wmde-banner-select-group {
			display: flex;
			width: 100%;
		}

		.wmde-banner-select-group-notice {
			height: auto;
		}

		.wmde-banner-select-group-option {
			display: block;
			height: auto;
			width: 100%;
		}

		.wmde-banner-select-group-label {
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-content: center;
			align-items: stretch;
		}
	}
}
</style>
