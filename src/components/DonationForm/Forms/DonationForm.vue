<template>
	<form
		:action="formUrl"
		method="post"
		class="wmde-banner-form"
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
				:errorMessage="'amountMessage( amountValidity, Translations )'"
				v-model="amount"
			>
				<SelectCustomAmount
					fieldName="select-amount"
					v-model="customAmount"
					@blur="validateCustomAmount"
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

import { ref, toRefs } from 'vue';
import SelectGroup from '@src/components/DonationForm/SubComponents/SelectGroup.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { Validity } from '@src/utils/FormModel/Validity';
import SelectCustomAmount from '@src/components/DonationForm/SubComponents/SelectCustomAmount.vue';
import { FormModel } from '@src/utils/FormModel/FormModel';
import { useFormModel } from '@src/utils/FormModel/services/useFormModel';

interface Props {
	formUrl: string;
	formItems: DonationFormItems;
	showErrorScrollLink?: boolean;
	pageNumber?: number;
}

const props = withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false
} );

const emit = defineEmits( [ 'submit' ] );

const isFormValid = ref<boolean>( true );

// TODO call tracker
const onFormInteraction = (): void => {};

// TODO implement validation based on form items
const validate = (): void => {
	// When valid emit and let the parent decide what to do
	emit( 'submit', { pageNumber: props.pageNumber } );
};

const isValidOrUnset = ( validity: Validity ): boolean => {
	return validity === Validity.Valid || validity === Validity.Unset;
};

const {
	interval, intervalValidity, disabledIntervals,
	amount, customAmount, amountValidity,
	paymentMethod, paymentMethodValidity, disabledPaymentMethods
} = useFormModel();

const validateCustomAmount = (): void => {};

</script>

<style lang="scss">
.wmde-banner {
	&-form {
		display: flex;
		height: 100%;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-end;
		margin: 0;

		&-field-group {
			border: 0;
			margin: 0;
			display: block;

			&-legend {
				width: 100%;
				position: relative;
				padding: 0;
			}
		}

		&-button-container {
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: flex-start;
			flex: 0 1 auto;
			width: 100%;
			margin-top: auto;
		}

		&-button {
			width: 100%;
			display: block;
			box-sizing: border-box;
			cursor: pointer;
			border: 0 none;
			white-space: nowrap;
		}
	}
}
</style>
