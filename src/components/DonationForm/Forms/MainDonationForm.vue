<template>
	<form
		:action="formActions.donateWithoutAddressAction"
		method="post"
		class="wmde-banner-sub-form wmde-banner-sub-form-donation"
		@click="onFormInteraction"
		@submit="validate"
	>
		<fieldset class="wmde-banner-form-field-group">
			<legend class="wmde-banner-form-field-group-legend">{{ $translate( 'intervals-header' ) }}</legend>
			<SelectGroup
				:field-name="'select-interval'"
				:selectionItems="formItems.intervals"
				:isValid="isValidOrUnset( intervalValidity )"
				:errorMessage="$translate( 'no-interval-message' )"
				v-model="interval"
				:disabledOptions="disabledIntervals"
			/>
		</fieldset>

		<fieldset class="wmde-banner-form-field-group">
			<legend class="wmde-banner-form-field-group-legend">{{ $translate( 'amounts-header' ) }}</legend>
			<SelectGroup
				fieldName="select-amount"
				:selectionItems="formItems.amounts"
				:isValid="isValidOrUnset( amountValidity )"
				:errorMessage="$translate( amountValidityMessageKey( amountValidity ) )"
				v-model="selectedAmount"
			>
				<SelectCustomAmount
					fieldName="select-amount"
					v-model="customAmount"
					@focus="clearSelectedAmount"
					@blur="formatCustomAmount"
					:placeholder="$translate( 'custom-amount-placeholder' )"
				/>
			</SelectGroup>
		</fieldset>

		<fieldset class="wmde-banner-form-field-group">
			<legend class="wmde-banner-form-field-group-legend">{{ $translate( 'payments-header' ) }}</legend>
			<SelectGroup
				:field-name="'select-payment-method'"
				:selectionItems="formItems.paymentMethods"
				:isValid="isValidOrUnset( paymentMethodValidity )"
				:errorMessage="$translate( 'no-payment-type-message' )"
				v-model="paymentMethod"
				:disabledOptions="disabledPaymentMethods"
			/>
		</fieldset>

		<div class="wmde-banner-form-button-container">
			<button class="wmde-banner-form-button" type="submit">
				{{ $translate( 'submit-label' ) }}
			</button>
			<button v-if="!isFormValid && showErrorScrollLink" class="wmde-banner-form-button-error">
				{{ $translate( 'global-error' ) }}
			</button>
		</div>

		<slot/>

	</form>
</template>

<script setup lang="ts">

import { inject, ref } from 'vue';
import SelectGroup from '@src/components/DonationForm/SubComponents/SelectGroup.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import SelectCustomAmount from '@src/components/DonationForm/SubComponents/SelectCustomAmount.vue';
import { useFormModel } from '@src/utils/FormModel/services/useFormModel';
import { newDonationFormValidator } from '@src/validation/DonationFormValidator';
import { amountValidityMessageKey } from '@src/utils/amountValidityMessageKey';
import { isValidOrUnset } from '@src/components/DonationForm/Forms/isValidOrUnset';
import { FormActions } from '@src/domain/FormActions';

interface Props {
	showErrorScrollLink?: boolean;
	pageNumber?: number;
}

const props = withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false
} );
const emit = defineEmits( [ 'submit' ] );

const currencyFormatter: Function = inject( 'currencyFormatter' );
const formActions = inject<FormActions>( 'formActions' );
const formItems = inject<DonationFormItems>( 'formItems' );

const formModel = useFormModel();
const validator = newDonationFormValidator( formModel );
const isFormValid = ref<boolean>( true );

const onFormInteraction = (): void => {};

const validate = ( e: Event ): void => {
	isFormValid.value = validator.validate();

	if ( !isFormValid.value ) {
		e.preventDefault();
		return;
	}

	emit( 'submit', { event: e, pageNumber: props.pageNumber } );
};

const {
	interval, intervalValidity, disabledIntervals,
	selectedAmount, customAmount, numericAmount, amountValidity,
	paymentMethod, paymentMethodValidity, disabledPaymentMethods
} = formModel;

const clearSelectedAmount = (): void => {
	selectedAmount.value = '';
};

const formatCustomAmount = (): void => {
	if ( customAmount.value !== '' ) {
		customAmount.value = currencyFormatter( numericAmount.value );
	}
};

</script>

<style lang="scss">
.wmde-banner {
	&-sub-form-donation {
		.wmde-banner-form-field-group {
			border: 0;
			margin: 0;
			display: block;

			&-legend {
				width: 100%;
				position: relative;
				padding: 0;
			}
		}
	}
}
</style>