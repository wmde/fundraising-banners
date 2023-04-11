<template>
    <form @submit="onSubmit" class="wmde-banner-sub-form wmde-banner-form-upgrade">
        <div class="wmde-banner-form-upgrade-title">
            <a tabIndex="-1" href="#" class="previous" @click="$emit('previous')">
                <ChevronLeftIcon/>
            </a>
            {{ $translate( 'form-step-2-header', { amount: secondPageAmount } ) }}
        </div>
        <div class="wmde-banner-form-upgrade-notice">{{ $translate( 'form-step-2-copy' ) }} </div>

        <div class="wmde-banner-form-upgrade-options">
            <div :class="[
				'wmde-banner-select-group-container',
				{ 'wmde-banner-select-group-container--with-error': !isValidOrUnset( upgradeToYearlyValidity ) }
				]"
            >
            <div class="wmde-banner-select-group">
                <div class="wmde-banner-select-group-option wmde-banner-select-group-option-no">
                    <label class="t-annual-upgrade-no">
                        <input
                                tabIndex="-1"
                                type="radio"
                                @click="onChooseUpgradeToYearly"
                                :checked="upgradeToYearly === Alternatives.NO"
                                name="alternative"
                                :value="Alternatives.NO"
                                class="wmde-banner-select-group-input"/>
                        <span class="wmde-banner-select-group-label">{{ $translate( 'form-step-2-no', { amount: secondPageAmount } ) }}</span>
                    </label>
                </div>
                <div class="wmde-banner-select-group-option wmde-banner-select-group-option-yes">
                    <label class="t-annual-upgrade-yes">
                        <input
                                tabIndex="-1"
                                type="radio"
                                @lick="onChooseUpgradeToYearly"
                                :checked="upgradeToYearly === Alternatives.YES"
                                name="alternative"
                                value="Alternatives.YES"
                                class="wmde-banner-select-group-input"/>
                        <span class="wmde-banner-select-group-label">{{ $translate( 'form-step-2-yes',  { amount: secondPageAmount } ) }}</span>
                    </label>
                </div>
            </div>
            <span class="wmde-banner-select-group-error-message">
					<span class="wmde-banner-error-icon">
						{{ $translate( 'form-step-2-error' ) }}
					</span>
				</span>
        </div>
        </div>

        <a tabIndex="-1" href="#" class="wmde-banner-form-upgrade-custom t-annual-upgrade-yes-custom" @click="onNextPage">
            {{ $translate( 'form-step-2-link' ) }}
        </a>

        <div class="wmde-banner-form-button-container form-step-2-button">
            <button tabIndex="-1" class="wmde-banner-form-button" @click="onSubmit">
                {{ $translate( 'form-step-2-button' ) }}
            </button>
        </div>

    </form>
</template>

<script setup lang="ts">

import { computed, inject, ref } from 'vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import { isValidOrUnset } from '@src/components/DonationForm/Forms/isValidOrUnset';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';

enum Alternatives {
	YES = 'YES',
	NO = 'NO'
}

interface Props {
    pageNumber: number
}

const props = defineProps<Props>();

const emit = defineEmits( [ 'submit', 'next', 'previous' ] );

const upgradeToYearly = ref<Alternatives>( null );
const upgradeToYearlyValidity = ref<Validity>( Validity.Unset );
const formModel = useFormModel();

const {
	numericAmount
} = formModel;

const onSubmit = (): void => {
	// validate that upgradetoyearly was selected (and update upgradeToYearlyValidity accordingly)
	// if something was selected, emit submit event with new interval
};
const onNextPage = ( e: Event ): void => {
	emit( 'next', {
		event: e,
		pageNumber: props.pageNumber,
		extraData: {
			upgradeToYearlyInterval: Intervals.YEARLY.value
		}
	} );
};
const onChooseUpgradeToYearly = (): void => {};

const currencyFormatter: Function = inject( 'currencyFormatter' );
const secondPageAmount = computed( (): string => currencyFormatter( numericAmount ) );

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
