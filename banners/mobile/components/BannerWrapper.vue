<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MiniBanner
			:banner-is-visible="bannerIsVisible"
			@close="onCloseMiniBanner"
			@show-full-page-banner="onshowFullPageBanner"
		/>
		<FullPageBanner
			@showFundsModal="isFundsModalVisible = true"
			:form-controller="formController"
			:forms="forms"
			@close="() => onClose( CloseSources.FollowUpBanner )"
		/>
		<SoftClose
			v-if="contentState === ContentStates.SoftClosing"
			@close="() => onClose( CloseSources.SoftCloseBannerRejected )"
			@maybe-later="() => onClose( CloseSources.MaybeLater )"
			@time-out-close="() => onClose( CloseSources.TimeOut )"
		/>
        <FundsModal
			:content="useOfFundsContent"
			:is-funds-modal-visible="isFundsModalVisible"
			@hideFundsModal="isFundsModalVisible = false"
        />
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import { Component, computed, nextTick, ref, watch } from 'vue';
import FullPageBanner from './FullPageBanner.vue';
import { FormController } from '@src/utils/FormController/FormController';
import MiniBanner from './MiniBanner.vue';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';

enum ContentStates {
	Mini = 'wmde-banner-wrapper--mini',
	FullPage = 'wmde-banner-wrapper--full-page',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

interface Props {
	bannerState: BannerStates;
	formController: FormController;
	forms: Component[];
	useOfFundsContent: useOfFundsContentInterface;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const isFundsModalVisible = ref<boolean>( false );

const bannerIsVisible = computed( () => props.bannerState === BannerStates.Visible );

const contentState = ref<ContentStates>( ContentStates.Mini );

watch( contentState, async () => {
	// Wait a tick in order to let the content re-render before notifying the parent
	await nextTick();
	emit( 'bannerContentChanged' );
} );

function onCloseMiniBanner(): void {
	contentState.value = ContentStates.SoftClosing;
}

function onClose( closeSource: CloseSources ): void {
	emit( 'bannerClosed', closeSource );
}

function onshowFullPageBanner(): void {
	contentState.value = ContentStates.FullPage;
}
</script>

<style lang="scss">
@use 'src/themes/mikings/variables/globals';
@use 'src/themes/mikings/variables/fonts';
@use 'src/themes/mikings/variables/colors';

@keyframes hide-mini {
	0% {
		opacity: 1;
	}
	99% {
		opacity: 0;
	}
	100% {
		display: none;
	}
}

.wmde-banner {

	&-full {
		visibility: hidden;
		opacity: 0;
		transform: scale( 1.1 );
		transition: opacity 500ms globals.$banner-easing, transform 500ms globals.$banner-easing;
	}

	&-wrapper {
		font-size: 16px;
		font-family: fonts.$ui;
		box-shadow: 0 3px 0.6em rgba( 60 60 60 / 40% );
		background-color: colors.$white;

		&--full-page {
			.wmde-banner-mini {
				animation: hide-mini 500ms;
			}
			.wmde-banner-full {
				visibility: visible;
				opacity: 1;
				transform: scale( 1 );
			}
		}

		&--soft-closing {
			.wmde-banner-mini {
				display: none;
			}
		}
	}

	&--closed {
		.wmde-banner-wrapper {
			display: none;
		}
	}
}

</style>
