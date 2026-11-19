<template>
	<form
		ref="mainForm"
		tabindex="-1"
		:aria-label="$translate( 'form-label' )"
		:aria-hidden="step === 1 ? true : null"
		class="wmde-b-donation-form wmde-c-flow"
		data-vertical-alignment="space"
		@submit.prevent="() => validate()"
		id="wmde-banner-form"
		@click="onClick"
	>
		<div class="wmde-b-callout" ref="errorMessage" data-error tabindex="-1" v-if="!stepOneIsValid">
			<small>{{ $translate( 'form-error' ) }}</small>
		</div>

		<div>
			<fieldset class="wmde-b-field-container" id="wmde-b-interval-field" :data-error="intervalValidity === Validity.Invalid ? true : null">
				<legend class="visually-hidden" id="wmde-b-interval-label">{{ $translate( 'intervals-header' ) }}</legend>
				<div class="wmde-c-form-grid" data-layout="halves">
					<label class="wmde-b-form-field" v-for="formItem in formItems.intervals" :key="formItem.value">
						<input type="radio" name="interval" :value="formItem.value" v-model="interval">{{ formItem.label }}
					</label>
				</div>
				<div tabindex="-1" id="wmde-b-interval-error" class="wmde-b-field-container__error">
					{{ $translate( 'no-interval-message' ) }}
				</div>
			</fieldset>
		</div>

		<div>
			<fieldset class="wmde-b-field-container" :data-error="[ AmountValidity.Unset, AmountValidity.Valid ].includes( amountValidity ) ? null : true">
				<legend class="visually-hidden" id="wmde-b-amount-label">{{ $translate( 'amounts-header' ) }}</legend>
				<div class="wmde-c-form-grid" data-layout="quarters">
					<label class="wmde-b-form-field" v-for="formItem in amounts" :key="formItem.value">
						<input type="radio" name="amount" :value="formItem.value" v-model="selectedAmount">{{ formItem.label }}
					</label>
					<div class="wmde-c-form-grid__double wmde-b-form-field" :class="{ 'wmde-b-text-radio__radio--checked' : customAmount !== '' }">
						<label class="visually-hidden" for="wmde-b-custom-amount">{{ $translate( 'custom-amount-placeholder' ) }}</label>
						<div class="wmde-b-text-radio">
							<span class="wmde-b-text-radio__radio"></span>
							<input
								type="text"
								name="custom-amount"
								class="wmde-b-text-radio__text noime"
								id="wmde-b-custom-amount"
								:placeholder="$translate( 'custom-amount-placeholder' )"
								v-model="customAmount"
								@blur="formatCustomAmount"
							>
						</div>
					</div>
				</div>
				<div tabindex="-1" id="wmde-b-amount-error" class="wmde-b-field-container__error">
					{{ $translate( amountValidityMessageKey( amountValidity ) ) }}
				</div>
			</fieldset>
		</div>

		<div>
			<fieldset class="wmde-b-field-container" :data-error="paymentMethodValidity === Validity.Invalid ? true : null">
				<legend class="visually-hidden" id="wmde-b-payment-type-label">{{ $translate( 'payments-header' ) }}</legend>
				<div class="wmde-c-form-grid" data-layout="quarters">
					<label class="wmde-b-form-field" v-for="formItem in formItems.paymentMethods" :key="formItem.value" data-stacked>
						<PaymentMethodIcon :payment-method="formItem.value"/>
						{{ formItem.label }}
						<input type="radio" name="paymentMethod" :value="formItem.value" v-model="paymentMethod">
					</label>
				</div>
				<div tabindex="-1" id="wmde-b-payment-type-error" class="wmde-b-field-container__error">
					{{ $translate( 'no-payment-type-message' ) }}
				</div>
			</fieldset>
		</div>

		<button class="wmde-b-button" data-fill type="submit">{{ $translate( submitButtonLabel ) }}</button>
	</form>

	<form ref="submitForm" :action="formAction" style="display: none;" method="post">
		<SubmitValues/>
	</form>

	<UpsellModal :modal-is-visible="step == 1" @submit="submit( 'UpgradeToYearlyForm' )" @close="onBack"/>
</template>

<script setup lang="ts">

import { Validity } from '@src/utils/FormModel/Validity';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { useFormModel } from '@src/components/composables/useFormModel';
import { newDonationFormValidator } from '@src/validation/DonationFormValidator';
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import type { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import type { Timer } from '@src/utils/Timer';
import type { Tracker } from '@src/tracking/Tracker';
import SubmitValues from '@src/components/DonationForm/SubComponents/SubmitValues.vue';
import { useFormAction } from '@src/components/composables/useFormAction';
import type { FormActionCollection } from '@src/domain/FormActions';
import PaymentMethodIcon from './PaymentMethodIcon.vue';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import { amountValidityMessageKey } from '@src/utils/amountValidityMessageKey';
import { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { FormStepShownEvent } from '@src/tracking/events/FormStepShownEvent';
import { useDynamicAmounts } from '@src/components/composables/useDynamicAmounts';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import UpsellModal from './UpsellModal.vue';

interface Props {
	localCloseTracker: LocalCloseTracker
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'close', 'formInteraction', 'submit' ] );

const formItems = inject<DonationFormItems>( 'formItems' );
const formModel = useFormModel();
const validator = newDonationFormValidator( formModel );
const { selectedAmount, customAmount, amountValidity, paymentMethod, paymentMethodValidity, interval, intervalValidity, formatCustomAmount } = formModel;
const amounts = useDynamicAmounts( formModel, formItems.dynamicAmounts );
const stepOneIsValid = computed( (): boolean => [ AmountValidity.Unset, AmountValidity.Valid ].includes( amountValidity.value )
	&& intervalValidity.value !== Validity.Invalid
	&& paymentMethodValidity.value !== Validity.Invalid
);
const timer = inject<Timer>( 'timer' );
const tracker = inject<Tracker>( 'tracker' );
const step = ref<number>( 0 );

const forms = ref<HTMLFormElement[]>( null );
const mainForm = ref<HTMLFormElement>( null );
const intervalForm = ref<HTMLFormElement>( null );
const submitForm = ref<HTMLFormElement>( null );
const errorMessage = ref<HTMLElement>( null );
const { formAction } = useFormAction( inject<FormActionCollection>( 'formActions' ) );
const submitButtonLabel = computed( (): string => interval.value === Intervals.ONCE.value ? 'submit-label-short' : 'submit-label' );
const secondPageWasSeen = ref<boolean>( false );

watch( step, ( newStep: number ) => {
	forms.value[ newStep ]?.focus();
	formModel.freezeAmount.value = newStep === 1;
} );

const onClick = (): void => {
	// This is so the banner height is adjusted correctly if form errors change it when they appear
	// We wait using setTimeout as nextTick() doesn't work here for some reason
	timer.nextTick( () => emit( 'formInteraction' ) );
};

const onBack = (): void => {
	if ( step.value === 0 ) {
		return;
	}

	step.value--;
};

const submit = async ( feature: TrackingFeatureName ): Promise<void> => {
	await nextTick();
	emit( 'submit' );
	tracker.trackEvent( new BannerSubmitEvent( feature, formModel.interval.value !== Intervals.ONCE.value ? 'recurring' : 'non-recurring' ) );

	// Fire an event if the donor has previously closed a banner from the soft close test
	const bannerType = props.localCloseTracker.getItem();
	if ( bannerType !== '' ) {
		tracker.trackEvent( new BannerSubmitOnReturnEvent( bannerType ) );
	}

	submitForm.value.submit();
};

const triggerSecondPageShownEvent = (): void => {
	if ( secondPageWasSeen.value ) {
		return;
	}

	tracker.trackEvent( new FormStepShownEvent( 'UpgradeToYearlyForm' ) );
	secondPageWasSeen.value = true;
};

const validate = async (): Promise<void> => {
	validator.validateAmount();
	validator.validateInterval();
	validator.validatePaymentMethod();

	if ( stepOneIsValid.value ) {
		if ( interval.value === Intervals.ONCE.value ) {
			step.value = 1;
			triggerSecondPageShownEvent();
		} else {
			await submit( 'MainDonationForm' );
		}
	} else {
		await nextTick();
		errorMessage.value.focus();
	}
};

const focusMainForm = (): void => mainForm.value.focus();

onMounted( () => {
	forms.value = [ mainForm.value, intervalForm.value ];
} );

defineExpose( { focusMainForm } );

</script>
