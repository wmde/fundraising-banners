<template>
    <form @submit.prevent="onSubmit" class="wmde-banner-sub-form wmde-banner-form-upgrade">
        <div class="wmde-banner-form-upgrade-title">
            <a tabIndex="-1" href="#" class="previous" @click.prevent="onPrevious">
                <slot name="back"/>
            </a>
            {{ $translate( 'upgrade-to-yearly-header', { amount: secondPageAmount } ) }}
        </div>
        <div class="wmde-banner-form-upgrade-notice">{{ $translate( 'upgrade-to-yearly-copy' ) }}</div>

		<div class="wmde-banner-form-upgrade-buttons">
			<button
				type="submit"
				tabIndex="-1"
				class="wmde-banner-form-button t-annual-upgrade-no"
				:value="Intervals.ONCE.value"
			>
				{{ $translate( 'upgrade-to-yearly-no', { amount: secondPageAmount } ) }}
			</button>

			<button
				type="submit"
				tabIndex="-1"
				class="wmde-banner-form-button t-annual-upgrade-yes"
				:value="Intervals.YEARLY.value"
			>
				{{ $translate( 'upgrade-to-yearly-yes', { amount: secondPageAmount } ) }}
			</button>

			<a tabIndex="-1"
				href="#"
				class="wmde-banner-form-upgrade-custom t-annual-upgrade-yes-custom"
				@click.prevent="onGoToChangeOfAmount"
			>
				{{ $translate( 'upgrade-to-yearly-link' ) }}
			</a>
		</div>
    </form>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { useFormStepShownEvent } from '@src/components/DonationForm/Forms/useFormStepShownEvent';
import { Tracker } from '@src/tracking/Tracker';
import { UpgradeToYearlyEvent } from '@src/tracking/events/UpgradeToYearlyEvent';

interface Props {
	isCurrent: boolean
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'submit', 'previous' ] );

const tracker = inject<Tracker>( 'tracker' );
const interval = ref<string>( '' );

useFormStepShownEvent( 'UpgradeToYearlyForm', tracker, props );

const onSubmit = ( e: SubmitEvent ): void => {
	const submitValue = ( e.submitter as HTMLInputElement ).value;

	tracker.trackEvent( new UpgradeToYearlyEvent(
		submitValue === Intervals.YEARLY.value ? 'upgraded-to-yearly' : 'not-upgraded-to-yearly'
	) );

	emit( 'submit', { upgradeToYearlyInterval: submitValue } );
};

const onGoToChangeOfAmount = (): void => {
	emit( 'submit', {
		changeOfAmount: true,
		upgradeToYearlyInterval: Intervals.YEARLY.value
	} );
};

const onPrevious = (): void => {
	interval.value = null;
	emit( 'previous' );
};

const { numericAmount } = useFormModel();
const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const secondPageAmount = computed( (): string => currencyFormatter.euroAmount( numericAmount.value ) );

</script>
