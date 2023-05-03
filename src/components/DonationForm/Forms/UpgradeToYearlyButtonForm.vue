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
				@click="onNext">
					{{ $translate( 'upgrade-to-yearly-link' ) }}
			</a>
		</div>
    </form>
</template>

<script setup lang="ts">

import { computed, inject, ref } from 'vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';

interface Props {
	pageIndex: number
}

const props = defineProps<Props>();

const emit = defineEmits( [ 'submit', 'next', 'previous' ] );

const interval = ref<string>( null );
const intervalValidity = ref<Validity>( Validity.Unset );

const onSubmit = ( e: SubmitEvent ): void => {
	const submitValue = ( e.submitter as HTMLInputElement ).value;

	if ( [ Intervals.ONCE.value, Intervals.YEARLY.value ].includes( submitValue ) ) {
		intervalValidity.value = Validity.Valid;
	} else {
		intervalValidity.value = Validity.Invalid;
	}

	if ( intervalValidity.value === Validity.Invalid ) {
		return;
	}
	emit( 'submit', {
		pageIndex: props.pageIndex,
		extraData: {
			upgradeToYearlyInterval: submitValue
		}
	} );
};

const onNext = (): void => {
	intervalValidity.value = Validity.Valid;
	emit( 'next', {
		pageIndex: props.pageIndex,
		extraData: {
			upgradeToYearlyInterval: Intervals.YEARLY.value
		}
	} );
};

const onPrevious = (): void => {
	intervalValidity.value = Validity.Unset;
	interval.value = null;
	emit( 'previous', { pageIndex: props.pageIndex } );
};

const { numericAmount } = useFormModel();
const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const secondPageAmount = computed( (): string => currencyFormatter.euroAmount( numericAmount.value ) );

</script>
