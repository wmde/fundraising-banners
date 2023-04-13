<template>
	<form @submit="onSubmit" class="wmde-banner-sub-form wmde-banner-form-address-type">
		<div class="wmde-banner-form-address-type-title">
			<a tabIndex="-1" href="#" class="back" @click="onPrevious">
				<ChevronLeftIcon/>
			</a>
			{{ $translate( 'address-type-label' ) }}
		</div>

		<fieldset class="wmde-banner-form-field-group">
			<legend class="wmde-banner-form-field-group-legend">{{ $translate( 'intervals-header' ) }}</legend>
			<SelectGroup
					fieldName="select-address-option"
					:selectionItems="formItems.addressType"
					:isValid="isValidOrUnset( addressTypeValidity )"
					:errorMessage="$translate('address-type-error-message' )"
					v-model="addressType"
					@change="TODO"
					:disabledOptions="disabledAddressTypes"
			/>
		</fieldset>

		<div class="wmde-banner-form-address-type-notice">{{ getFormNotice() }}</div>

		<div class="wmde-banner-form-button-container wmde-banner-form-address-type-button">
			<button tabIndex="-1" class="wmde-banner-form-button" type="submit">
				{{ getButtonText() }}
			</button>
		</div>
	</form>

</template>

<script setup lang="ts">
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import { isValidOrUnset } from '@src/components/DonationForm/Forms/isValidOrUnset';
import SelectGroup from '@src/components/DonationForm/SubComponents/SelectGroup.vue';
import { inject } from 'vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';
import { useFormModel } from '@src/components/composables/useFormModel';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { Validity } from '@src/utils/FormModel/Validity';

const formItems = inject<DonationFormItems>( 'formItems' );
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
	// TODO reset selection? validity?
	emit( 'previous', { pageIndex: props.pageIndex } );
};

const onSubmit = (): void => {
	//TODO add more checks here? test this
	if ( addressTypeValidity.value === Validity.Valid ) {
		emit( 'submit', { pageIndex: props.pageIndex } );
	}
};


const getFormNotice = (): string => {
	if ( paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value ) {
		//TODO
		// return $translate( 'address-type-notice-direct-debit' );
	}
	return '';
};

const getButtonText = (): string => {
	if ( addressType.value !== AddressTypes.NO.value ) {
		// return $translate( 'submit-label-default' );
		return '';
	}

	if ( paymentMethod.value === PaymentMethods.PAYPAL.value ) {
		// return $translate( 'submit-label-paypal' );
		return '';
	} else if ( paymentMethod.value === PaymentMethods.CREDIT_CARD.value ) {
		// return $translate( 'submit-label-credit-card' );
		return '';
	} else if ( paymentMethod.value === PaymentMethods.SOFORT.value ) {
		// return $translate( 'submit-label-sofort' );
		return '';
	} else if ( paymentMethod.value === PaymentMethods.BANK_TRANSFER.value ) {
		// return $translate( 'submit-label-bank-transfer' );
		return '';
	}
	// return $translate( 'submit-label-default' );
	return '';
};

</script>
