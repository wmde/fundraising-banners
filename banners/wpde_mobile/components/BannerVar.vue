<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MiniBanner
			@close="onCloseMiniBanner"
			@show-full-page-banner="onshowFullPageBanner"
		>
			<template #banner-slides>
				<BannerSlides :play="slideshowShouldPlay"/>
			</template>
		</MiniBanner>

		<FullPageBannerVar
			@showFundsModal="isFundsModalVisible = true"
			@close="() => onClose( CloseSources.FollowUpBanner )"
		>
			<template #banner-text>
				<BannerText/>
			</template>

			<template #progress>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</template>

			<template #donation-form>
				<MultiStepDonation :form-controller="formController">

					<template #form-page-1="{ pageIndex, submit, next, previous }: any">
						<MainDonationForm :page-index="pageIndex" @submit="submit" @next="next" @previous="previous"/>
					</template>

					<template #form-page-2="{ pageIndex, submit, next, previous }: any">
						<UpgradeToYearlyButtonForm :page-index="pageIndex" @submit="submit" @next="next" @previous="previous"/>
					</template>

				</MultiStepDonation>
			</template>

			<template #footer>
				<BannerFooter @showFundsModal="isFundsModalVisible = true" />
			</template>
		</FullPageBannerVar>

		<SoftClose
			v-if="contentState === ContentStates.SoftClosing"
			@close="() => onClose( CloseSources.SoftCloseBannerRejected )"
			@maybe-later="() => onClose( CloseSources.MaybeLater )"
			@time-out-close="() => onClose( CloseSources.TimeOut )"
		/>

		<FundsModal
			:content="useOfFundsContent"
			:is-funds-modal-visible="isFundsModalVisible"
			@hideFundsModal="onHideFundsModal"
        />
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import { computed, nextTick, ref, watch } from 'vue';
import FullPageBannerVar from './FullPageBannerVar.vue';
import { FormController } from '@src/utils/FormController/FormController';
import MiniBanner from './MiniBanner.vue';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { UseOfFundsCloseSources } from '@src/components/UseOfFunds/UseOfFundsCloseSources';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import BannerText from '../content/BannerText.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import UpgradeToYearlyButtonForm from '@src/components/DonationForm/Forms/UpgradeToYearlyButtonForm.vue';
import BannerSlides from '../content/BannerSlides.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';

enum ContentStates {
	Mini = 'wmde-banner-wrapper--mini',
	FullPage = 'wmde-banner-wrapper--full-page',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

interface Props {
	bannerState: BannerStates;
	formController: FormController;
	useOfFundsContent: useOfFundsContentInterface;
	pageScroller: PageScroller;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const isFundsModalVisible = ref<boolean>( false );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
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
	slideShowStopped.value = true;
	contentState.value = ContentStates.FullPage;
}

const onHideFundsModal = ( payload: { source: UseOfFundsCloseSources } ): void => {
	props.pageScroller.scrollIntoView( payload.source === UseOfFundsCloseSources.callToAction ?
		'.wmde-banner-form' :
		'.wmde-banner-full-small-print .wmde-banner-footer-usage-link'
	);
	isFundsModalVisible.value = false;
};

</script>

<style lang="scss">
@use 'src/themes/Mikings/variables/globals';
@use 'src/themes/Mikings/variables/fonts';
@use 'src/themes/Mikings/variables/colors';

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
