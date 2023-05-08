<template>
	<form
		method="post"
		class="wmde-banner-sub-form wmde-banner-sub-form-donation"
		@click="onFormInteraction"
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
				v-model:inputValue="paymentMethod"
				:disabledOptions="disabledPaymentMethods"
			>
				<SmsBox/>
			</SelectGroup>
		</fieldset>

		<div class="wmde-banner-form-button-container">
			<button class="wmde-banner-form-button" type="submit">
				{{ submitButtonLabel }}
			</button>
			<button v-if="!isFormValid && showErrorScrollLink" class="wmde-banner-form-button-error">
				{{ $translate( 'global-error' ) }}
			</button>
		</div>

		<slot/>

	</form>
</template>

<script lang="ts">
// All form components must have names
export default {
	name: 'MainDonationForm'
};
</script>
<script setup lang="ts">

import { computed, inject, ref } from 'vue';
import SelectGroup from '@src/components/DonationForm/SubComponents/SelectGroup.vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import SelectCustomAmount from '@src/components/DonationForm/SubComponents/SelectCustomAmount.vue';
import SmsBox from '@src/components/DonationForm/SubComponents/SmsBox.vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { newDonationFormValidator } from '@src/validation/DonationFormValidator';
import { amountValidityMessageKey } from '@src/utils/amountValidityMessageKey';
import { isValidOrUnset } from '@src/components/DonationForm/Forms/isValidOrUnset';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { Translator } from '@src/Translator';

interface Props {
	showErrorScrollLink?: boolean;
	pageIndex?: number;
}

const props = withDefaults( defineProps<Props>(), {
	showErrorScrollLink: false
} );
const emit = defineEmits( [ 'submit' ] );

const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const formItems = inject<DonationFormItems>( 'formItems' );
const translator = inject<Translator>( 'translator' );

const formModel = useFormModel();
const validator = newDonationFormValidator( formModel );
const isFormValid = ref<boolean>( true );

const onFormInteraction = (): void => {};

const validate = (): void => {
	isFormValid.value = validator.validate();

	if ( isFormValid.value ) {
		emit( 'submit', { pageIndex: props.pageIndex } );
	}
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
		customAmount.value = currencyFormatter.customAmountInput( numericAmount.value );
	}
};

// This label assumes that we have a multi-step form with an upsell page
// Ig this assumption is no longer valid, we must extract the label generation
// (dependent on formModel and form steps) into an injectable interface (or property)
// As a workaround for single tests you can also use the same translation for both labels
const submitButtonLabel = computed( (): string => {
	return interval.value === Intervals.ONCE.value && paymentMethod.value !== PaymentMethods.SOFORT.value ?
		translator.translate( 'submit-label-short' ) :
		translator.translate( 'submit-label' );

} );

</script>
