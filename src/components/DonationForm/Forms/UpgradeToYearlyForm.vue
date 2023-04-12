<template>
    <form @submit.prevent="onSubmit" class="wmde-banner-sub-form wmde-banner-form-upgrade">
        <div class="wmde-banner-form-upgrade-title">
            <a tabIndex="-1" href="#" class="previous" @click.prevent="$emit( 'previous', { pageIndex } )">
                <ChevronLeftIcon/>
            </a>
            {{ $translate( 'upgrade-to-yearly-header', { amount: secondPageAmount } ) }}
        </div>
        <div class="wmde-banner-form-upgrade-notice">{{ $translate( 'upgrade-to-yearly-copy' ) }}</div>

        <div class="wmde-banner-form-upgrade-options">
            <div :class="[
				'wmde-banner-select-group-container',
				{ 'wmde-banner-select-group-container--with-error': intervalValidity === Validity.Invalid }
            ]">
                <div class="wmde-banner-select-group">
                    <div class="wmde-banner-select-group-option wmde-banner-select-group-option-no">
                        <label class="t-annual-upgrade-no">
                            <input
                                tabIndex="-1"
                                type="radio"
                                v-model="interval"
                                name="alternative"
                                :value="Intervals.ONCE.value"
                                class="wmde-banner-select-group-input"
                            />
                            <span class="wmde-banner-select-group-label">
                                {{ $translate( 'upgrade-to-yearly-no', { amount: secondPageAmount } ) }}
                            </span>
                        </label>
                    </div>
                    <div class="wmde-banner-select-group-option wmde-banner-select-group-option-yes">
                        <label class="t-annual-upgrade-yes">
                            <input
                                tabIndex="-1"
                                type="radio"
                                v-model="interval"
                                name="alternative"
                                :value="Intervals.YEARLY.value"
                                class="wmde-banner-select-group-input"
                            />
                            <span class="wmde-banner-select-group-label">
                                {{ $translate( 'upgrade-to-yearly-yes', { amount: secondPageAmount } ) }}
                            </span>
                        </label>
                    </div>
                </div>
                <span v-if="intervalValidity === Validity.Invalid" class="wmde-banner-select-group-error-message">
					<span class="wmde-banner-error-icon">
						{{ $translate( 'upgrade-to-yearly-error' ) }}
					</span>
				</span>
            </div>
        </div>

        <a tabIndex="-1" href="#" class="wmde-banner-form-upgrade-custom t-annual-upgrade-yes-custom"
           @click="onNextPage">
            {{ $translate( 'upgrade-to-yearly-link' ) }}
        </a>

        <div class="wmde-banner-form-button-container upgrade-to-yearly-button">
            <button tabIndex="-1" class="wmde-banner-form-button" type="submit">
                {{ $translate( 'upgrade-to-yearly-button' ) }}
            </button>
        </div>

    </form>
</template>

<script setup lang="ts">

import { computed, inject, ref } from 'vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';

interface Props {
	pageIndex: number
}

const props = defineProps<Props>();

const emit = defineEmits( [ 'submit', 'next', 'previous' ] );

const interval = ref<string>( null );
const intervalValidity = ref<Validity>( Validity.Unset );

const onSubmit = (): void => {
	if ( !interval.value ) {
		intervalValidity.value = Validity.Invalid;
		return;
	}
	emit( 'submit', {
		pageIndex: props.pageIndex,
		extraData: {
			upgradeToYearlyInterval: interval.value
		}
	} );
};

const onNextPage = (): void => {
	emit( 'next', {
		pageIndex: props.pageIndex,
		extraData: {
			upgradeToYearlyInterval: Intervals.YEARLY.value
		}
	} );
};

const { numericAmount } = useFormModel();
const currencyFormatter = inject<Currency>( 'currencyFormatter' );
const secondPageAmount = computed( (): string => currencyFormatter.euroAmount( numericAmount.value ) );

</script>

<style lang="scss">
.wmde-banner {
	&-form-upgrade {
		&-title {
			width: 100%;
			display: block;
		}

		&-options {
			width: 100%;
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
		}

		&-field {
			flex-grow: 1;
		}

		.wmde-banner-select-group {
			display: flex;
			width: 100%;
		}

		.wmde-banner-select-group-notice {
			height: auto;
		}

		.wmde-banner-select-group-option {
			display: block;
			height: auto;
			width: 100%;
		}

		.wmde-banner-select-group-label {
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			align-content: center;
			align-items: stretch;
		}
	}
}
</style>
