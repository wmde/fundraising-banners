<template>
	<dialog class="wmde-b-upsell-modal" closedby="any" ref="dialog">
		<div ref="container" tabindex="-1" aria-labelledby="wmde-banner-interval-label">
			<div class="wmde-b-upsell-modal__heading wmde-c-repel" data-nowrap>
				<button class="wmde-b-nav-button" @click.prevent="$emit( 'close' )" data-icon>
					<span class="visually-hidden">{{ $translate( 'back-button' ) }}</span>
					<FormPreviousIcon/>
				</button>
			</div>
			<div class="wmde-b-upsell-modal__scroll">
				<form
					class="wmde-b-upsell-modal__content wmde-c-flow"
					data-vertical-alignment="center"
					@submit.prevent
				>
					<h2 id="wmde-banner-interval-label">{{ $translate( 'upgrade-to-yearly-header', { amount: formattedAmount } ) }}</h2>
					<div class="wmde-c-flow" v-html="$translate( 'upgrade-to-yearly-copy' )"/>

					<div class="wmde-b-upsell-modal__buttons">
						<button
							class="wmde-b-button"
							type="submit"
							data-fill
							@click.prevent="() => selectInterval( Intervals.ONCE.value )"
							:value="Intervals.ONCE.value"
						>
							{{ $translate( 'upgrade-to-yearly-no', { amount: formattedAmount } ) }}
						</button>

						<button
							class="wmde-b-button"
							type="submit"
							data-fill
							@click.prevent="() => selectInterval( Intervals.YEARLY.value )"
							:value="Intervals.YEARLY.value"
						>
							{{ $translate( 'upgrade-to-yearly-yes', { amount: formattedAmount } ) }}
						</button>
					</div>

				</form>
			</div>
		</div>
	</dialog>
</template>

<script setup lang="ts">

import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { computed, inject, onMounted, ref, watch } from 'vue';
import type { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { UpgradeToYearlyEvent } from '@src/tracking/events/UpgradeToYearlyEvent';
import type { Tracker } from '@src/tracking/Tracker';
import { useFormModel } from '@src/components/composables/useFormModel';
import FormPreviousIcon from '@src/components/Icons/FormPreviousIcon.vue';

interface Props {
	modalIsVisible: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'submit', 'close' ] );

const tracker = inject<Tracker>( 'tracker' );
const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const formModel = useFormModel();
const { amountInCents, interval } = formModel;
const formattedAmount = computed( (): string => currencyFormatter.euroAmountFromCents( amountInCents.value ) );

const dialog = ref<HTMLDialogElement>( null );
const container = ref<HTMLElement>( null );

watch( () => props.modalIsVisible, ( visible: boolean ) => {
	if ( visible ) {
		dialog.value.showModal();
		container.value.focus();
	} else {
		dialog.value.close();
	}
} );

const selectInterval = ( newInterval: string ): void => {
	interval.value = newInterval;

	tracker.trackEvent( new UpgradeToYearlyEvent(
		newInterval === Intervals.YEARLY.value ? 'upgraded-to-yearly' : 'not-upgraded-to-yearly'
	) );

	emit( 'submit' );
};

onMounted( () => {
	dialog.value.addEventListener( 'close', () => emit( 'close' ) );
} );

</script>
