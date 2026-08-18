<template>
	<div class="wmde-b-mini-donation-form wmde-c-flow">
		<header class="wmde-c-repel">
			<div>
				<button class="wmde-banner-form-navigation-button" @click.prevent="onBack" v-if="step > 0">
					<FormPreviousIcon/>
					{{ $translate( 'back-button' ) }}
				</button>
			</div>

			<button class="wmde-banner-form-navigation-button" @click.prevent="$emit( 'close' )">
				<span class="visually-hidden">{{ $translate( 'close' ) }}</span>
				<CloseIconMobile/>
			</button>
		</header>

		<div class="wmde-b-donation-form keen-slider" ref="container" @click="onClick">
			<form
				ref="amountForm"
				tabindex="-1"
				:aria-labelledby="`wmde-b-amount-label ${![ AmountValidity.Unset, AmountValidity.Valid ].includes( amountValidity ) ? 'wmde-b-amount-error' : ''}`"
				class="keen-slider__slide wmde-b-donation-form__step wmde-banner-form wmde-c-flow"
				@submit.prevent="() => validateStep( 0 )"
			>
				<div id="wmde-b-amount-label">{{ $translate( 'form-1-legend' ) }}</div>

				<div ref="amountError" tabindex="-1" id="wmde-b-amount-error" class="wmde-b-donation-form__error"
					v-if="![ AmountValidity.Unset, AmountValidity.Valid ].includes( amountValidity )">
					{{ $translate( amountValidityMessageKey( amountValidity ) ) }}
				</div>

				<div class="wmde-b-donation-form__grid">
					<label class="wmde-b-form-field" v-for="formItem in formItems.amounts" :key="formItem.value">
						<input type="radio" name="amount" :value="formItem.value" v-model="selectedAmount" :tabindex="tabIndex( 0 )">{{ formItem.label }}
					</label>
					<label class="wmde-b-form-field" :class="{ 'active' : customAmount !== '' }">
						<span class="visually-hidden">{{ $translate( 'custom-amount-placeholder' ) }}</span>
						<input type="text" name="custom-amount" :placeholder="$translate( 'custom-amount-placeholder' )" v-model="customAmount" :tabindex="tabIndex( 0 )">
					</label>
				</div>

				<button class="wmde-b-button" data-theme="teritary" type="submit" :tabindex="tabIndex( 0 )">{{ $translate( 'form-button-next' ) }}</button>
			</form>

			<form
				ref="intervalForm"
				tabindex="-1"
				:aria-labelledby="`wmde-banner-interval-label ${intervalValidity === Validity.Invalid ? 'wmde-b-interval-error' : ''}`"
				class="keen-slider__slide wmde-b-donation-form__step wmde-banner-form wmde-c-flow"
			>
				<div id="wmde-banner-interval-label">{{ $translate( 'upgrade-to-yearly-header', { amount: secondPageAmount } ) }}</div>
				<div v-html="$translate( 'upgrade-to-yearly-copy' )"/>

				<div ref="intervalError" tabindex="-1" id="wmde-b-interval-error" class="wmde-b-donation-form__error" v-if="intervalValidity === Validity.Invalid">
					{{ $translate( 'no-interval-message' ) }}
				</div>

				<button
					class="wmde-b-button"
					data-theme="teritary"
					type="submit"
					@click.prevent="() => selectInterval( Intervals.ONCE.value )"
					:value="Intervals.ONCE.value"
					:tabindex="tabIndex( 1 )"
				>
					{{ $translate( 'upgrade-to-yearly-no', { amount: secondPageAmount } ) }}
				</button>

				<button
					class="wmde-b-button"
					data-theme="teritary"
					type="submit"
					@click.prevent="() => selectInterval( Intervals.YEARLY.value )"
					:value="Intervals.YEARLY.value"
					:tabindex="tabIndex( 1 )"
				>
					{{ $translate( 'upgrade-to-yearly-yes', { amount: secondPageAmount } ) }}
				</button>

			</form>

			<form
				ref="paymentTypeForm"
				tabindex="-1"
				:aria-labelledby="`wmde-banner-payment-type-label ${paymentMethodValidity === Validity.Invalid ? 'wmde-b-payment-type-error' : ''}`"
				class="keen-slider__slide wmde-b-donation-form__step wmde-banner-form wmde-c-flow"
				@submit.prevent="() => validateStep( 2 )"
			>
				<div id="wmde-banner-payment-type-label">{{ $translate( 'form-3-legend' ) }}</div>

				<div ref="paymentTypeError" tabindex="-1" id="wmde-b-payment-type-error" class="wmde-b-donation-form__error" v-if="paymentMethodValidity === Validity.Invalid">
					{{ $translate( 'no-payment-type-message' ) }}
				</div>

				<div class="wmde-b-donation-form__grid">
					<label class="wmde-b-form-field" v-for="formItem in formItems.paymentMethods" :key="formItem.value">
						<input type="radio" name="payment-method" :value="formItem.value" v-model="paymentMethod" :tabindex="tabIndex( 2 )">{{ formItem.label }}
					</label>
				</div>

				<button class="wmde-b-button" data-theme="teritary" type="submit" :tabindex="tabIndex( 2 )">{{ $translate( 'form-button-next' ) }}</button>
			</form>
		</div>

		<footer class="wmde-c-repel">
			<div>
				<ContentCopier :label="$translate( 'donation-account' )" value="Wikimedia e. V."/>
				<ContentCopier label="IBAN" value="DE09 3702 0500 0003 2873 00" copy-value="DE09370205000003287300"/>
			</div>
			<div>
				<ContentCopier label="BIC" value="BFSWDE33XXX"/>
			</div>
		</footer>
		<pre style="background: #ffffff; position: absolute; top: 100%;">{{ formModel }}</pre>
	</div>
	<form ref="submitForm" :action="formAction" style="display: none;" method="post" target="_blank">
		<SubmitValues/>
	</form>
</template>

<script setup lang="ts">

import { useKeenSlider } from 'keen-slider/vue';
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import type { Timer } from '@src/utils/Timer';
import type { DonationFormItems } from '@src/utils/FormItemsBuilder/DonationFormItems';
import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import FormPreviousIcon from '@src/components/Icons/FormPreviousIcon.vue';
import ContentCopier from './ContentCopier.vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { newDonationFormValidator } from '@src/validation/DonationFormValidator';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import { amountValidityMessageKey } from '@src/utils/amountValidityMessageKey';
import { Validity } from '@src/utils/FormModel/Validity';
import SubmitValues from '@src/components/DonationForm/SubComponents/SubmitValues.vue';
import { useFormAction } from '@src/components/composables/useFormAction';
import type { FormActionCollection } from '@src/domain/FormActions';
import type { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { UpgradeToYearlyEvent } from '@src/tracking/events/UpgradeToYearlyEvent';
import type { Tracker } from '@src/tracking/Tracker';

const emit = defineEmits( [ 'close', 'showFundsModal', 'formInteraction' ] );

const formModel = useFormModel();
const validator = newDonationFormValidator( formModel );
const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const { selectedAmount, customAmount, amountInCents, amountValidity, paymentMethod, paymentMethodValidity, interval, intervalValidity } = formModel;
const secondPageAmount = computed( (): string => currencyFormatter.euroAmountFromCents( amountInCents.value ) );
const formItems = inject<DonationFormItems>( 'formItems' );
const timer = inject<Timer>( 'timer' );
const tracker = inject<Tracker>( 'tracker' );
const [ container, slider ] = useKeenSlider( {
	initial: 0,
	drag: false,
	loop: false,
	slides: {
		spacing: 15
	}
} );
const step = ref<number>( 0 );

const forms = ref<HTMLFormElement[]>( null );
const amountForm = ref<HTMLFormElement>( null );
const amountError = ref<HTMLFormElement>( null );
const intervalForm = ref<HTMLFormElement>( null );
const intervalError = ref<HTMLFormElement>( null );
const paymentTypeForm = ref<HTMLFormElement>( null );
const paymentTypeError = ref<HTMLFormElement>( null );
const submitForm = ref<HTMLFormElement>( null );
const { formAction } = useFormAction( inject<FormActionCollection>( 'formActions' ) );

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
			if ( validator.validateAmount() ) {
				step.value = 1;
				// intervalForm.value.focus();
			} else {
				await nextTick();
				amountError.value.focus();
			}
			break;
		case 1:
			if ( validator.validateInterval() ) {
				step.value = 2;
				// paymentTypeForm.value.focus();
			} else {
				intervalError.value.focus();
			}
			break;
		case 2:
			if ( validator.validatePaymentType() ) {
				// DO something
			} else {
				paymentTypeError.value.focus();
			}
			break;
	}
};

const selectInterval = ( newInterval: string ): void => {
	interval.value = newInterval;

	tracker.trackEvent( new UpgradeToYearlyEvent(
		newInterval === Intervals.YEARLY.value ? 'upgraded-to-yearly' : 'not-upgraded-to-yearly'
	) );

	validateStep( 1 );
};

const tabIndex = ( stepNumber: number ): number | null => {
	return step.value === stepNumber ? null : -1;
};

onMounted( () => {
	// This fixes Keen Slider rendering a little early and not having the correct width
	timer.nextTick( () => slider.value.update() );

	forms.value = [ amountForm.value, intervalForm.value, paymentTypeForm.value ];

	slider.value.on( 'animationEnded', () => {
		forms.value[ step.value ]?.focus();
	} );
} );

</script>
