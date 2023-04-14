<template>
	<form @submit.prevent="onSubmit" class="wmde-banner-sub-form wmde-banner-form-address-type">
		<div class="wmde-banner-form-address-type-title">
			<a tabIndex="-1" href="#" class="back" @click="onPrevious">
				<ChevronLeftIcon/>
			</a>
			{{ $translate( 'address-type-label' ) }}
		</div>

		<fieldset class="wmde-banner-form-field-group">
			<legend class="wmde-banner-form-field-group-legend">{{ $translate( 'address-type-header' ) }}</legend>
			<SelectGroup
				fieldName="select-address-option"
				:selectionItems="formItems.addressType"
				:isValid="isValidOrUnset( addressTypeValidity )"
				:errorMessage="$translate( 'address-type-error-message' )"
				v-model="addressType"
				@change="onChange"
				:disabledOptions="disabledAddressTypes"
			/>
		</fieldset>

		<div class="wmde-banner-form-address-type-notice">{{ formNotice }}</div>

		<div class="wmde-banner-form-button-container wmde-banner-form-address-type-button">
			<button tabIndex="-1" class="wmde-banner-form-button" type="submit">
				{{ buttonText }}
			</button>
		</div>
	</form>

</template>

<script setup lang="ts">
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import { isValidOrUnset } from '@src/components/DonationForm/Forms/isValidOrUnset';
import SelectGroup from '@src/components/DonationForm/SubComponents/SelectGroup.vue';
import { computed, inject } from 'vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { useFormModel } from '@src/components/composables/useFormModel';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { Validity } from '@src/utils/FormModel/Validity';
import { Translator } from '@src/Translator';

const formItems = inject<DonationFormItems>( 'formItems' );
const translator = inject<Translator>( 'translator' );
const formModel = useFormModel();
const {
	addressType, addressTypeValidity,
	paymentMethod, disabledAddressTypes
} = formModel;
interface Props {
	pageIndex: number
}
const props = defineProps<Props>();
const emit = defineEmits( [ 'submit', 'previous' ] );

const onPrevious = (): void => {
	emit( 'previous', { pageIndex: props.pageIndex } );
};

const onSubmit = (): void => {
	addressTypeValidity.value = addressType.value === '' ? Validity.Invalid : Validity.Valid;
	if ( addressTypeValidity.value === Validity.Valid ) {
		emit( 'submit', { pageIndex: props.pageIndex } );
	}
};

const onChange = (): void => {
	addressTypeValidity.value = Validity.Valid;
};

const formNotice = computed( (): string => {
	if ( paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value ) {
		return translator.translate( 'address-type-notice-direct-debit' );
	}
	return '';
} );

const buttonText = computed( (): string => {
	if ( addressType.value !== AddressTypes.NO.value ) {
		return translator.translate( 'submit-label-default' );
	}
	if ( paymentMethod.value === PaymentMethods.PAYPAL.value ) {
		return translator.translate( 'submit-label-paypal' );
	} else if ( paymentMethod.value === PaymentMethods.CREDIT_CARD.value ) {
		return translator.translate( 'submit-label-credit-card' );
	} else if ( paymentMethod.value === PaymentMethods.SOFORT.value ) {
		return translator.translate( 'submit-label-sofort' );
	} else if ( paymentMethod.value === PaymentMethods.BANK_TRANSFER.value ) {
		return translator.translate( 'submit-label-bank-transfer' );
	}
	return translator.translate( 'submit-label-default' );
} );

</script>

<style lang="scss">
.wmde-banner {
	&-form-address-type {
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
