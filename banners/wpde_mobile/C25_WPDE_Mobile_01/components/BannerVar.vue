<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<SetAlreadyDonatedCookieImage v-if="showSetAlreadyDonatedCookieImage"/>
		<SetCookieImage v-if="showSetCookieImage"/>
		<MiniBanner
			@close="onCloseMiniBanner"
			@show-full-page-banner="onshowFullPageBanner"
			@show-full-page-banner-preselected="onshowFullPageBannerPreselected"
			@showFundsModal="onShowFundsModal( 'MiniBanner' )"
			@already-donated-clicked="onClose( 'AlreadyDonated', CloseChoices.AlreadyDonated )"
		>
			<template #banner-slides>
				<KeenSlider :with-navigation="false" :play="slideshowShouldPlay" :interval="7000">

					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide" :play-live-text="contentState === ContentStates.Mini"/>
					</template>

				</KeenSlider>
			</template>
		</MiniBanner>

		<FullPageBanner
			@showFundsModal="onShowFundsModal( 'FullPageBanner' )"
			@close="() => onClose( 'FullPageBanner', CloseChoices.Hide )"
		>
			<template #banner-text>
				<BannerText :play-live-text="contentState === ContentStates.FullPage"/>
			</template>

			<template #progress>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</template>

			<template #donation-form>
				<MultiStepDonation :step-controllers="stepControllers" :page-scroller="pageScroller">

					<template #[FormStepNames.MainDonationFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<MainDonationForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous"/>
					</template>

					<template #[FormStepNames.UpgradeToYearlyFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<UpgradeToYearlyButtonForm
							:page-index="pageIndex"
							@submit="submit"
							:is-current="isCurrent"
							@previous="previous"
						>
							<template #back>
								<ChevronLeftIcon/>
								{{ $translate( 'back-button' ) }}
							</template>
						</UpgradeToYearlyButtonForm>
					</template>

				</MultiStepDonation>
			</template>

			<template #footer>
				<BannerFooter :show-funds-link="false"/>
			</template>
		</FullPageBanner>

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
import { computed, inject, ref, watch } from 'vue';
import FullPageBanner from './FullPageBanner.vue';
import MiniBanner from './MiniBannerVar.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import BannerText from '../content/BannerTextVar.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import UpgradeToYearlyButtonForm from '@src/components/DonationForm/Forms/UpgradeToYearlyButtonForm.vue';
import BannerSlides from '../content/BannerSlidesVar.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import { Tracker } from '@src/tracking/Tracker';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { useFormModel } from '@src/components/composables/useFormModel';
import {
	createSubmittableMainDonationForm
} from '@src/components/DonationForm/StepControllers/SubmittableMainDonationForm';
import {
	createSubmittableUpgradeToYearly
} from '@src/components/DonationForm/StepControllers/SubmittableUpgradeToYearly';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import SetCookieImage from '@src/components/SetWPDECookieImage/SetCookieImage.vue';
import SetAlreadyDonatedCookieImage from '@src/components/SetWPDECookieImage/SetAlreadyDonatedCookieImage.vue';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';

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
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const tracker = inject<Tracker>( 'tracker' );

const isFundsModalVisible = ref<boolean>( false );
const slideShowStopped = ref<boolean>( false );
const showSetCookieImage = ref<boolean>( false );
const showSetAlreadyDonatedCookieImage = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
const contentState = ref<ContentStates>( ContentStates.Mini );
const formModel = useFormModel();
const stepControllers = [
	createSubmittableMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableUpgradeToYearly( formModel, FormStepNames.MainDonationFormStep, FormStepNames.MainDonationFormStep )
];

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

function onCloseMiniBanner(): void {
	onClose( 'MiniBanner', CloseChoices.Close );
}

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
	emit( 'modalClosed' );
	switch ( userChoice ) {
		case CloseChoices.MaybeLater:
		case CloseChoices.Hide:
			// don't set a cookie
			break;
		case CloseChoices.AlreadyDonated:
			showSetAlreadyDonatedCookieImage.value = true;
			break;
		default:
			showSetCookieImage.value = true;
			break;
	}
}

function onshowFullPageBanner(): void {
	slideShowStopped.value = true;
	contentState.value = ContentStates.FullPage;
	emit( 'modalOpened' );

	tracker.trackEvent( new MobileMiniBannerExpandedEvent() );
}

function onshowFullPageBannerPreselected(): void {
	slideShowStopped.value = true;
	formModel.selectedAmount.value = '5';
	contentState.value = ContentStates.FullPage;
	tracker.trackEvent( new MobileMiniBannerExpandedEvent( 'preselected' ) );
}

const onHideFundsModal = (): void => {
	isFundsModalVisible.value = false;

	if ( contentState.value === ContentStates.Mini ) {
		emit( 'modalClosed' );
	}

	if ( contentState.value === ContentStates.FullPage ) {
		props.pageScroller.scrollIntoView( '.wmde-banner-form' );
	}
};

const onShowFundsModal = ( feature: TrackingFeatureName ): void => {
	isFundsModalVisible.value = true;
	tracker.trackEvent( new UseOfFundsShownEvent( feature ) );

	if ( contentState.value === ContentStates.Mini ) {
		emit( 'modalOpened' );
	}
};

const onFundsModalCallToAction = (): void => {
	isFundsModalVisible.value = false;

	if ( contentState.value === ContentStates.Mini ) {
		onshowFullPageBanner();
	}

	props.pageScroller.scrollIntoView( '.wmde-banner-form' );
};

</script>
