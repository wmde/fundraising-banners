<template>
	<form
		method="post"
		class="wmde-banner-sub-form wmde-banner-sub-form-donation"
		@submit.prevent="validate"
	>
		<fieldset class="wmde-banner-form-field-group">
			<legend class="wmde-banner-form-field-group-legend">{{ $translate( 'intervals-header' ) }}</legend>
			<SelectGroup
				:field-name="'select-interval'"
				:selectionItems="formItems.intervals"
				:isValid="isValidOrUnset( intervalValidity )"
				:errorMessage="$translate( 'no-interval-message' )"
				v-model:inputValue="interval"
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
				v-model:inputValue="selectedAmount"
			>
				<SelectCustomAmount
					fieldName="select-amount"
					v-model:inputValue="customAmount"
					@focus="clearSelectedAmount"
					@blur="formatCustomAmount"
					:placeholder="$translate( customAmountPlaceholderKey )"
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
				v-model:inputValue="paymentMethod"
				:disabledOptions="disabledPaymentMethods"
			>
				<template #select-group-label="{ label, slotName }: any">
					<slot :name="'label-' + slotName" :label="label"/>
				</template>
			</SelectGroup>
		</fieldset>

		<div class="wmde-banner-form-donation-receipt-checkbox" v-if="showReceiptCheckbox">
			<input
				class="wmde-banner-form-field-checkbox"
				type="checkbox"
				value="person"
				id="wmde-banner-form-donation-receipt"
				v-model="receipt"
			>
			<label for="wmde-banner-form-donation-receipt">
				{{ $translate( 'donation-receipt-checkbox-label' ) }}
			</label>
		</div>

		<div class="wmde-banner-form-button-container">
			<slot name="button">
				<MainDonationFormButton :payment-labels-below-cents="showReceiptCheckboxBelowCents"/>
			</slot>
			<button v-if="!isFormValid && showErrorScrollLink" class="wmde-banner-form-button-error">
				{{ $translate( 'global-error' ) }}
			</button>
		</div>
	</form>
</template>

<script lang="ts">
/**
 * The difference to `MainDonationFormReceiptAboveValue.vue` is that it's using a specific Button
 * that displays the button label under different conditions
 */

// All form components must have names
export default {
	name: 'MainDonationFormReceiptAboveValueDynamicLabel'
};
</script>

<script setup lang="ts">

import { computed, inject, onMounted, ref, watch } from 'vue';
import SelectGroup from '@src/components/DonationForm/SubComponents/SelectGroup.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import SelectCustomAmount from '@src/components/DonationForm/SubComponents/SelectCustomAmount.vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { newDonationFormValidator } from '@src/validation/DonationFormValidator';
import { amountValidityMessageKey } from '@src/utils/amountValidityMessageKey';
import { isValidOrUnset } from '@src/components/DonationForm/Forms/isValidOrUnset';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import MainDonationFormButton from '@src/components/DonationForm/SubComponents/SubmitButtons/MainDonationFormPaymentsAndReceiptButtonDynamicLabel.vue';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

interface Props {
	showReceiptCheckboxBelowCents: number;
	showErrorScrollLink?: boolean;
	customAmountPlaceholderKey?: string;
}

const props = withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false,
	customAmountPlaceholderKey: 'custom-amount-placeholder'
} );
const emit = defineEmits( [ 'submit' ] );

const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const formItems = inject<DonationFormItems>( 'formItems' );
const formModel = useFormModel();
const validator = newDonationFormValidator( formModel );
const showReceiptCheckbox = computed<boolean>( () => {
	if ( interval.value === '' ) {
		return false;
	}
	if ( paymentMethod.value === '' || paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value ) {
		return false;
	}

	if ( amountInCents.value >= props.showReceiptCheckboxBelowCents ) {
		return false;
	}

	return true;
} );
const isFormValid = ref<boolean>( true );

const validate = (): void => {
	isFormValid.value = validator.validate();

	if ( isFormValid.value ) {
		emit( 'submit' );
	}
};

const {
	interval, intervalValidity, disabledIntervals,
	selectedAmount, customAmount, amountInCents, amountValidity,
	paymentMethod, paymentMethodValidity, disabledPaymentMethods,
	addressType, receipt
} = formModel;

const clearSelectedAmount = (): void => {
	selectedAmount.value = '';
};

const formatCustomAmount = (): void => {
	if ( customAmount.value !== '' ) {
		customAmount.value = currencyFormatter.customAmountInputFromCents( amountInCents.value );
	}
};

watch( [ interval, paymentMethod, amountInCents ], () => {
	if ( !showReceiptCheckbox.value ) {
		receipt.value = false;
	}
} );

onMounted( () => {
	addressType.value = AddressTypes.ANONYMOUS.value;
} );

</script>
