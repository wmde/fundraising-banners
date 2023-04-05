<template>
    <form @submit="onSubmit" class="wmde-banner-sub-form wmde-banner-form-upgrade">
        <div class="wmde-banner-form-upgrade-title">
            <a tabIndex="-1" href="#" class="back" @click="onBack">
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

        <a tabIndex="-1" href="#" class="wmde-banner-form-upgrade-custom t-annual-upgrade-yes-custom" @click="onNext">
            {{ $translate( 'form-step-2-link' ) }}
        </a>

        <div class="wmde-banner-form-button-container form-step-2-button">
            <button tabIndex="-1" class="wmde-banner-form-button" type="submit">
                {{ $translate( 'form-step-2-button' ) }}
            </button>
        </div>

    </form>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { useFormModel } from '@src/utils/FormModel/services/useFormModel';

enum Alternatives {
	YES = 'YES',
	NO = 'NO'
}

const upgradeToYearly = ref<Alternatives>( null );

const formModel = useFormModel();

const {
	interval, intervalValidity, disabledIntervals,
	numericAmount
} = formModel;

const onSubmit = (): void => {};
const onBack = (): void => {};
const onChooseUpgradeToYearly = (): void => {};

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
