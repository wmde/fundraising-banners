<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MiniBanner
			@close="onCloseMiniBanner"
			@show-full-page-banner="onshowFullPageBanner"
			@show-full-page-banner-preselected-amount="onShowFullPageBannerPreselectedAmount"
			@show-use-of-funds="onShowFundsModal( 'MiniBanner' )"
		>
			<template #banner-slides>
				<KeenSlider :with-navigation="false" :play="slideshowShouldPlay" :interval="5000">

					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide" :play-live-text="contentState === ContentStates.Mini"/>
					</template>

				</KeenSlider>
			</template>
		</MiniBanner>

		<FullPageBanner
			@close="() => onClose( 'FullPageBanner', CloseChoices.Hide )"
			@show-use-of-funds="onShowFundsModal( 'FullPageBanner' )"
		>
			<template #banner-text>
				<BannerText :play-live-text="contentState === ContentStates.FullPage"/>
			</template>

			<template #progress>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</template>

			<template #donation-form="{ formInteraction }: any">
				<MultiStepDonation :step-controllers="stepControllers" @form-interaction="formInteraction" :page-scroller="pageScroller">

					<template #[FormStepNames.MainDonationFormStep]="{ pageIndex, submit, previous, isCurrent }: any">
						<MainDonationForm
							:page-index="pageIndex"
							:is-current="isCurrent"
							@submit="submit"
							@previous="previous"
							custom-amount-placeholder-key="custom-amount-placeholder-short"
						>

							<template #label-payment-ppl>
								<span class="wmde-banner-select-group-label with-logos paypal"><PayPalLogo/></span>
							</template>

							<template #label-payment-mcp>
								<span class="wmde-banner-select-group-label with-logos credit-cards">
									<VisaLogo/>
									<MastercardLogo/>
								</span>
							</template>

						</MainDonationForm>
					</template>

					<template #[FormStepNames.UpgradeToYearlyFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<UpgradeToYearlyButtonForm
							:page-index="pageIndex"
							:is-current="isCurrent"
							@submit="submit"
							@previous="previous"
						>
							<template #back>
								<ChevronLeftIcon/> {{ $translate( 'back-button' ) }}
							</template>
						</UpgradeToYearlyButtonForm>
					</template>

				</MultiStepDonation>
			</template>

			<template #footer>
				<BannerFooter @showFundsModal="onShowFundsModal( 'Footer' )" />
			</template>
		</FullPageBanner>

		<SoftClose
			v-if="contentState === ContentStates.SoftClosing"
			@close="() => onClose( 'SoftClose', CloseChoices.Close )"
			@maybe-later="() => onClose( 'SoftClose', CloseChoices.MaybeLater )"
			@time-out-close="() => onClose( 'SoftClose', CloseChoices.TimeOut )"
		>
			<template #buttons="{ timer }: any">
				<button
					class="wmde-banner-soft-close-button wmde-banner-soft-close-button-maybe-later"
					@click="() => onSoftCloseClose( timer, 'SoftClose', CloseChoices.MaybeLater )">
					{{ $translate( 'soft-close-button-maybe-later' ) }}
				</button>
				<button
					class="wmde-banner-soft-close-button wmde-banner-soft-close-button-close"
					@click="() => onSoftCloseClose( timer, 'SoftClose', CloseChoices.Close )">
					{{ $translate( 'soft-close-button-close' ) }}
				</button>
				<button
					class="wmde-banner-soft-close-button wmde-banner-soft-close-button-already-donated"
					@click="() => onSoftCloseClose( timer, 'SoftClose', CloseChoices.NoMoreBannersForCampaign )">
					{{ $translate( 'soft-close-button-already-donated' ) }}
				</button>
			</template>
		</SoftClose>

		<FundsModal
			:content="useOfFundsContent"
			:visible="isFundsModalVisible"
			@hide="onHideFundsModal"
			@callToAction="onFundsModalCallToAction"
		/>
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import { computed, inject, ref, watch } from 'vue';
import FullPageBanner from './FullPageBannerVar.vue';
import MiniBanner from './MiniBannerVar.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import BannerText from '../content/BannerText.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import BannerSlides from '../content/BannerSlides.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import MastercardLogo from '@src/components/PaymentLogos/MastercardLogo.vue';
import VisaLogo from '@src/components/PaymentLogos/VisaLogo.vue';
import PayPalLogo from '@src/components/PaymentLogos/PayPalLogo.vue';
import { Tracker } from '@src/tracking/Tracker';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { useFormModel } from '@src/components/composables/useFormModel';
import UpgradeToYearlyButtonForm from '@src/components/DonationForm/Forms/UpgradeToYearlyButtonForm.vue';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import { createSubmittableMainDonationForm } from '@src/components/DonationForm/StepControllers/SubmittableMainDonationForm';
import { createSubmittableUpgradeToYearly } from '@src/components/DonationForm/StepControllers/SubmittableUpgradeToYearly';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
const formModel = useFormModel();

enum ContentStates {
	Mini = 'wmde-banner-wrapper--mini',
	FullPage = 'wmde-banner-wrapper--full-page',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

enum FormStepNames {
	MainDonationFormStep = 'MainDonationForm',
	UpgradeToYearlyFormStep = 'UpgradeToYearlyForm'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	pageScroller: PageScroller;
	remainingImpressions: number;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const tracker = inject<Tracker>( 'tracker' );

const isFundsModalVisible = ref<boolean>( false );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
const contentState = ref<ContentStates>( ContentStates.Mini );
const stepControllers = [
	createSubmittableMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableUpgradeToYearly( formModel, FormStepNames.MainDonationFormStep, FormStepNames.MainDonationFormStep )
];

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

function onCloseMiniBanner(): void {
	if ( props.remainingImpressions > 0 ) {
		contentState.value = ContentStates.SoftClosing;
	} else {
		onClose( 'MainBanner', CloseChoices.Close );
	}
}

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
}

function onshowFullPageBanner(): void {
	slideShowStopped.value = true;
	contentState.value = ContentStates.FullPage;
	tracker.trackEvent( new MobileMiniBannerExpandedEvent( 'different-amount' ) );
}

function onShowFullPageBannerPreselectedAmount(): void {
	slideShowStopped.value = true;
	formModel.selectedAmount.value = '10';
	contentState.value = ContentStates.FullPage;
	tracker.trackEvent( new MobileMiniBannerExpandedEvent( 'preselected' ) );
}

const onShowFundsModal = ( feature: TrackingFeatureName ): void => {
	isFundsModalVisible.value = true;
	tracker.trackEvent( new UseOfFundsShownEvent( feature ) );

	if ( contentState.value === ContentStates.Mini ) {
		emit( 'modalOpened' );
	}
};

const onHideFundsModal = (): void => {
	isFundsModalVisible.value = false;

	if ( contentState.value === ContentStates.Mini ) {
		emit( 'modalClosed' );
	}

	if ( contentState.value === ContentStates.FullPage ) {
		props.pageScroller.scrollIntoView( '.wmde-banner-form' );
	}
};

const onFundsModalCallToAction = (): void => {
	isFundsModalVisible.value = false;

	if ( contentState.value === ContentStates.Mini ) {
		onshowFullPageBanner();
	}

	props.pageScroller.scrollIntoView( '.wmde-banner-form' );
};

function onSoftCloseClose( timer: number, feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	window.clearInterval( timer );
	onClose( feature, userChoice );
}

</script>
