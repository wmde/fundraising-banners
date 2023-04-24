<template>
	<form @submit.prevent="onSubmit" class="wmde-banner-sub-form wmde-banner-form-address-type">
		<div class="wmde-banner-form-address-type-title">
			<a tabIndex="-1" href="#" class="previous" @click="onPrevious">
				<ChevronLeftIcon/>
				{{ $translate( 'back-button' ) }}
			</a>
			{{ $translate( 'address-type-label' ) }}
		</div>

		<div class="wmde-banner-form-address-type-buttons">
			<div
				v-for="item in formItems.addressType"
				:key="item.value"
				:class="[ 'wmde-banner-form-address-type-button', {
					'wmde-banner-form-address-type-button--disabled': disabledAddressTypes.indexOf( item.value ) > -1
				} ]"
			>
				<button type="submit"
						tabIndex="-1"
						class="wmde-banner-form-button"
						:value="item.value"
						:disabled="disabledAddressTypes.indexOf( item.value ) > -1"
				>
					{{ $translate( item.label ) }}
				</button>
				<div class="wmde-banner-form-address-type-button-notice"> {{ $translate( item.notice ) }} </div>
			</div>
		</div>

		<div class="wmde-banner-form-address-type-notice">{{ formNotice }}</div>
	</form>

</template>

<script setup lang="ts">
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import { computed, inject } from 'vue';
import { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
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

const onSubmit = ( e: SubmitEvent ): void => {
	const submitValue = ( e.submitter as HTMLInputElement ).value;

	if ( formItems.addressType.find( item => item.value === submitValue ) ) {
		addressTypeValidity.value = Validity.Valid;
	} else {
		addressTypeValidity.value = Validity.Invalid;
	}

	if ( addressTypeValidity.value === Validity.Valid ) {
		addressType.value = submitValue;
		emit( 'submit', { pageIndex: props.pageIndex } );
	}
};

const formNotice = computed( (): string => {
	if ( paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value ) {
		return translator.translate( 'address-type-notice-direct-debit' );
	}
	return '';
} );

</script>