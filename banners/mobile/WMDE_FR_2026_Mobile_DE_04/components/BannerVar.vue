<template>
	<div class="wmde-banner__wrapper" :class="contentState">
		<MiniBanner
			@close="() => onMiniClose( 'MiniBanner', CloseChoices.Close )"
			@show-full-page-banner="onshowFullPageBanner"
			@show-full-page-banner-preselected="onshowFullPageBannerPreselected"
			@showFundsModal="onShowFundsModal( 'MiniBanner' )"
			@already-donated-clicked="onMiniClose( 'MiniBanner', CloseChoices.AlreadyDonated )"
		>
			<template #banner-slides>
				<KeenSlider :with-navigation="false" :play="slideshowShouldPlay" :interval="7000">

					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide" :play-live-text="contentState === ContentStates.Mini">
						</BannerSlides>
					</template>

				</KeenSlider>
			</template>
		</MiniBanner>

		<MiniDonationForm
			@showFundsModal="onShowFundsModal( 'FullPageBanner' )"
			@close="() => onFullPageClose( 'FullPageBanner', CloseChoices.Hide )"
		>

		</MiniDonationForm>

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
import MiniDonationForm from './MiniDonationForm.vue';
import MiniBanner from './MiniBannerVar.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import type { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/EditableContent/UseOfFundsContent';
import type { PageScroller } from '@src/utils/PageScroller/PageScroller';
import BannerSlides from '../content/BannerSlides.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import type { Tracker } from '@src/tracking/Tracker';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { useFormModel } from '@src/components/composables/useFormModel';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import type { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { createSubmittableMainDonationForm } from '@src/components/DonationForm/StepControllers/SubmittableMainDonationForm';
import { createSubmittableUpgradeToYearly } from '@src/components/DonationForm/StepControllers/SubmittableUpgradeToYearly';
import type { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import type { FormItem } from '@src/utils/FormItemsBuilder/FormItem';
import FormItemsBuilder from '@src/utils/FormItemsBuilder/FormItemsBuilder';
import type { Translator } from '@src/Translator';
import type { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';

enum ContentStates {
	Mini = 'wmde-banner-wrapper--mini',
	FullPage = 'wmde-banner-wrapper--full-page'
}

enum FormStepNames {
	MainDonationFormStep = 'MainDonationForm',
	UpgradeToYearlyFormStep = 'UpgradeToYearlyForm'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	pageScroller: PageScroller;
	localCloseTracker: LocalCloseTracker;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerSubmitted', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const tracker = inject<Tracker>( 'tracker' );

const isFundsModalVisible = ref<boolean>( false );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
const contentState = ref<ContentStates>( ContentStates.Mini );
const formModel = useFormModel();
const stepControllers = [
	createSubmittableMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableUpgradeToYearly( formModel, FormStepNames.MainDonationFormStep, FormStepNames.MainDonationFormStep )
];

const localTranslator = inject<Translator>( 'translator' );
const currencyFormatter = inject<Currency>( 'currencyFormatter' );

const localFormItemsBuilder = new FormItemsBuilder( localTranslator, currencyFormatter.euroAmount.bind( currencyFormatter ) );
const amountOptionsFive = localFormItemsBuilder.setAmounts( 5, 15, 25, 50, 100 ).getItems().amounts;
const amountOptionsTen = localFormItemsBuilder.setAmounts( 10, 15, 25, 50, 100 ).getItems().amounts;
const amountOptionsForForm = ref<FormItem[]>( amountOptionsTen );

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

function onMiniClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
}

function onFullPageClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
	emit( 'modalClosed' );
}

const onSubmit = (): void => {
	const closeChoice = props.localCloseTracker.getItem();
	if ( closeChoice !== '' ) {
		tracker.trackEvent( new BannerSubmitOnReturnEvent( closeChoice ) );
	}
};

function onshowFullPageBanner(): void {
	slideShowStopped.value = true;
	contentState.value = ContentStates.FullPage;
	emit( 'modalOpened' );

	amountOptionsForForm.value = amountOptionsFive;

	tracker.trackEvent( new MobileMiniBannerExpandedEvent() );
}

function onshowFullPageBannerPreselected(): void {
	slideShowStopped.value = true;

	amountOptionsForForm.value = amountOptionsTen;

	formModel.selectedAmount.value = '10';
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
