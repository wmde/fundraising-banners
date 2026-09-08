<template>
	<div class="wmde-b-donation-form keen-slider" ref="container" @click="onClick">
		<form
			ref="mainForm"
			tabindex="-1"
			aria-labelledby="wmde-b-amount-label"
			class="keen-slider__slide wmde-b-donation-form__step wmde-c-flow"
			@submit.prevent="() => validateStep( 0 )"
		>
			<div class="wmde-b-callout" ref="errorMessage" data-error tabindex="-1" v-if="!stepOneIsValid">
				Please Fix the issues in the form below
			</div>

			<fieldset class="wmde-b-field-container" :data-error="intervalValidity === Validity.Invalid ? true : null">
				<legend class="visually-hidden">{{ $translate( 'intervals-header' ) }}</legend>
				<div class="wmde-c-form-grid" data-layout="halves">
					<label class="wmde-b-form-field" v-for="formItem in formItems.intervals" :key="formItem.value">
						<input type="radio" name="interval" :value="formItem.value" v-model="interval" :tabindex="tabIndex( 0 )">{{ formItem.label }}
					</label>
				</div>
				<div tabindex="-1" id="wmde-b-interval-error" class="wmde-b-field-container__error">
					{{ $translate( 'no-interval-message' ) }}
				</div>
			</fieldset>
			<hr>
			<fieldset class="wmde-b-field-container" :data-error="[ AmountValidity.Unset, AmountValidity.Valid ].includes( amountValidity ) ? null : true">
				<legend class="visually-hidden">{{ $translate( 'amounts-header' ) }}</legend>
				<div class="wmde-c-form-grid" data-layout="quarters">
					<label class="wmde-b-form-field" v-for="formItem in formItems.amounts" :key="formItem.value">
						<input type="radio" name="amount" :value="formItem.value" v-model="selectedAmount" :tabindex="tabIndex( 0 )">{{ formItem.label }}
					</label>
					<div class="wmde-c-form-grid__double wmde-b-form-field" :class="{ 'wmde-b-text-radio__radio--checked' : customAmount !== '' }">
						<label class="visually-hidden" for="wmde-b-custom-amount">{{ $translate( 'custom-amount-placeholder' ) }}</label>
						<div class="wmde-b-text-radio">
							<span class="wmde-b-text-radio__radio"></span>
							<input
								type="text"
								name="custom-amount"
								class="wmde-b-text-radio__text"
								id="wmde-b-custom-amount"
								:placeholder="$translate( 'custom-amount-placeholder' )"
								v-model="customAmount"
								:tabindex="tabIndex( 0 )"
								@blur="formatCustomAmount"
							>
						</div>
					</div>
				</div>
				<div tabindex="-1" id="wmde-b-amount-error" class="wmde-b-field-container__error">
					{{ $translate( amountValidityMessageKey( amountValidity ) ) }}
				</div>
			</fieldset>
			<hr>
			<fieldset class="wmde-b-field-container" :data-error="paymentMethodValidity === Validity.Invalid ? true : null">
				<legend class="visually-hidden">{{ $translate( 'payments-header' ) }}</legend>
				<div class="wmde-c-form-grid" data-layout="quarters">
					<label class="wmde-b-form-field" v-for="formItem in formItems.paymentMethods" :key="formItem.value" data-stacked>
						<PaymentMethodIcon :payment-method="formItem.value"/>
						{{ formItem.label }}
						<input type="radio" name="paymentMethod" :value="formItem.value" v-model="paymentMethod" :tabindex="tabIndex( 0 )">
					</label>
				</div>
				<div tabindex="-1" id="wmde-b-payment-type-error" class="wmde-b-field-container__error">
					{{ $translate( 'no-payment-type-message' ) }}
				</div>
			</fieldset>

			<button class="wmde-b-button" type="submit" :tabindex="tabIndex( 0 )">{{ $translate( submitButtonLabel ) }}</button>
		</form>

		<form
			ref="intervalForm"
			tabindex="-1"
			:aria-labelledby="`wmde-banner-interval-label ${intervalValidity === Validity.Invalid ? 'wmde-b-interval-error' : ''}`"
			class="keen-slider__slide wmde-b-donation-form__step wmde-c-flow"
			data-vertical-alignment="center"
			@submit.prevent
		>
			<h2 id="wmde-banner-interval-label">{{ $translate( 'upgrade-to-yearly-header', { amount: formattedAmount } ) }}</h2>
			<div class="wmde-c-flow" v-html="$translate( 'upgrade-to-yearly-copy' )"/>

			<div class="wmde-c-flow">
				<button
					class="wmde-b-button"
					type="submit"
					data-fill
					@click.prevent="() => selectInterval( Intervals.ONCE.value )"
					:value="Intervals.ONCE.value"
					:tabindex="tabIndex( 1 )"
				>
					{{ $translate( 'upgrade-to-yearly-no', { amount: formattedAmount } ) }}
				</button>

				<button
					class="wmde-b-button"
					type="submit"
					data-fill
					@click.prevent="() => selectInterval( Intervals.YEARLY.value )"
					:value="Intervals.YEARLY.value"
					:tabindex="tabIndex( 1 )"
				>
					{{ $translate( 'upgrade-to-yearly-yes', { amount: formattedAmount } ) }}
				</button>
			</div>

		</form>
	</div>

	<form ref="submitForm" :action="formAction" style="display: none;" method="post" target="_blank">
		<SubmitValues/>
	</form>
</template>

<script setup lang="ts">

import { Validity } from '@src/utils/FormModel/Validity';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { useFormModel } from '@src/components/composables/useFormModel';
import { newDonationFormValidator } from '@src/validation/DonationFormValidator';
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import type { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import type { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import type { Timer } from '@src/utils/Timer';
import type { Tracker } from '@src/tracking/Tracker';
import { useKeenSlider } from 'keen-slider/vue';
import SubmitValues from '@src/components/DonationForm/SubComponents/SubmitValues.vue';
import { useFormAction } from '@src/components/composables/useFormAction';
import type { FormActionCollection } from '@src/domain/FormActions';
import { UpgradeToYearlyEvent } from '@src/tracking/events/UpgradeToYearlyEvent';
import PaymentMethodIcon from './PaymentMethodIcon.vue';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import { amountValidityMessageKey } from '@src/utils/amountValidityMessageKey';

const emit = defineEmits( [ 'close', 'formInteraction', 'submit' ] );

const formModel = useFormModel();
const validator = newDonationFormValidator( formModel );
const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const { selectedAmount, customAmount, amountInCents, amountValidity, paymentMethod, paymentMethodValidity, interval, intervalValidity, formatCustomAmount } = formModel;
const formattedAmount = computed( (): string => currencyFormatter.euroAmountFromCents( amountInCents.value ) );
const stepOneIsValid = computed( (): boolean => [ AmountValidity.Unset, AmountValidity.Valid ].includes( amountValidity.value )
	&& intervalValidity.value !== Validity.Invalid
	&& paymentMethodValidity.value !== Validity.Invalid
);
const formItems = inject<DonationFormItems>( 'formItems' );
const timer = inject<Timer>( 'timer' );
const tracker = inject<Tracker>( 'tracker' );
const [ container, slider ] = useKeenSlider( {
	initial: 0,
	drag: false,
	loop: false
} );
const step = ref<number>( 0 );

const forms = ref<HTMLFormElement[]>( null );
const mainForm = ref<HTMLFormElement>( null );
const intervalForm = ref<HTMLFormElement>( null );
const submitForm = ref<HTMLFormElement>( null );
const errorMessage = ref<HTMLElement>( null );
const { formAction } = useFormAction( inject<FormActionCollection>( 'formActions' ) );
const submitButtonLabel = computed( (): string => interval.value === Intervals.ONCE.value ? 'submit-label-short' : 'submit-label' );

watch( step, ( newStep: number ) => {
	if ( slider.value.track.details.rel !== newStep ) {
		slider.value.moveToIdx( newStep );
	}
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

const validateStep = async ( currentStep: number ): Promise<void> => {
	switch ( currentStep ) {
		case 0:
			validator.validateAmount();
			validator.validateInterval();
			validator.validatePaymentMethod();

			if ( stepOneIsValid.value ) {
				step.value = 1;
			} else {
				await nextTick();
				errorMessage.value.focus();
			}
			break;
		case 1:
			if ( validator.validateInterval() ) {
				emit( 'submit' );
				submitForm.value.submit();
			} else {
				// intervalError.value.focus();
			}
			break;
	}
};

const tabIndex = ( stepNumber: number ): number | null => {
	return step.value === stepNumber ? null : -1;
};

const selectInterval = ( newInterval: string ): void => {
	interval.value = newInterval;

	tracker.trackEvent( new UpgradeToYearlyEvent(
		newInterval === Intervals.YEARLY.value ? 'upgraded-to-yearly' : 'not-upgraded-to-yearly'
	) );

	validateStep( 1 );
};

onMounted( () => {
	// This fixes Keen Slider rendering a little early and not having the correct width
	timer.nextTick( () => slider.value.update() );

	forms.value = [ mainForm.value, intervalForm.value ];

	slider.value.on( 'animationEnded', () => {
		forms.value[ step.value ]?.focus();
	} );
} );

defineExpose( { onBack, step } );

</script>
