<template>
	<form
		ref="form"
		tabindex="-1"
		:aria-hidden="!isCurrentStep"
		class="wmde-b-upsell-form wmde-c-flow"
		aria-describedby="wmde-banner-interval-label"
		@submit.prevent
	>
		<div class="wmde-b-prose wmde-c-flow" data-align="centered">
			<h2 id="wmde-banner-interval-label">{{ $translate( 'upgrade-to-yearly-header', { amount: formattedAmount } ) }}</h2>
			<div class="wmde-c-flow" v-html="$translate( 'upgrade-to-yearly-copy' )"/>
		</div>

		<div class="wmde-c-flow">
			<button
				class="wmde-b-upsell-button wmde-c-flow"
				type="submit"
				data-fill
				@click.prevent="() => selectInterval( Intervals.YEARLY.value )"
				:value="Intervals.YEARLY.value"
				:tabindex="tabIndex()"
			>
				<span class="wmde-b-upsell-button__title wmde-c-repel">
					<span class="wmde-c-cluster" data-nowrap>{{ $translate( 'upgrade-to-yearly-yes-title', { amount: formattedAmount } ) }} <UpsellIcon/></span>
					<span class="wmde-b-tag" aria-hidden="true">{{ $translate( 'upgrade-to-yearly-yes-pill' ) }}</span>
				</span>
				<span class="wmde-b-upsell-button__content">{{ $translate( 'upgrade-to-yearly-yes', { amount: formattedAmount } ) }}</span>
			</button>

			<button
				class="wmde-b-upsell-button wmde-c-flow"
				type="submit"
				data-fill
				@click.prevent="() => selectInterval( Intervals.ONCE.value )"
				:value="Intervals.ONCE.value"
				:tabindex="tabIndex()"
			>
				<span class="wmde-b-upsell-button__title">{{ $translate( 'upgrade-to-yearly-no-title', { amount: formattedAmount } ) }}</span>
				<span class="wmde-b-upsell-button__content">{{ $translate( 'upgrade-to-yearly-no', { amount: formattedAmount } ) }}</span>
			</button>
		</div>

	</form>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, ref, watch } from 'vue';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { UpgradeToYearlyEvent } from '@src/tracking/events/UpgradeToYearlyEvent';
import { useFormModel } from '@src/components/composables/useFormModel';
import type { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import type { Tracker } from '@src/tracking/Tracker';
import UpsellIcon from './UpsellIcon.vue';

interface Props {
	isCurrentStep: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'submit' ] );

const form = ref<HTMLFormElement>( null );
const tracker = inject<Tracker>( 'tracker' );
const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const formModel = useFormModel();
const { interval, amountInCents } = formModel;
const formattedAmount = computed( (): string => currencyFormatter.euroAmountFromCents( amountInCents.value ) );

const selectInterval = async ( newInterval: string ): Promise<void> => {
	interval.value = newInterval;

	tracker.trackEvent( new UpgradeToYearlyEvent(
		newInterval === Intervals.YEARLY.value ? 'upgraded-to-yearly' : 'not-upgraded-to-yearly'
	) );

	await nextTick();
	emit( 'submit' );
};

watch( () => props.isCurrentStep, ( becameCurrentStep: boolean ) => {
	if ( becameCurrentStep ) {
		form.value.focus();
	}
} );

const tabIndex = (): number | null => {
	return props.isCurrentStep ? null : -1;
};

</script>
