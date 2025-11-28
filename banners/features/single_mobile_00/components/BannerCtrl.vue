<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MiniBanner
			@close="() => onClose( 'MiniBanner', CloseChoices.Close )"
			@show-full-page-banner="onExpandBanner"
			@show-full-page-banner-preselected="onExpandBannerPreselected"
			@showFundsModal="onShowFundsModal( 'MiniBanner' )"
			@already-donated-clicked="onClose( 'MiniBanner', CloseChoices.AlreadyDonated )"
		>
			<template #banner-slides>
				<KeenSlider :with-navigation="false" :play="slideshowShouldPlay" :interval="7000">

					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide" :play-live-text="contentState === ContentStates.Mini">
							<template #progress><ProgressBar amount-to-show-on-right="TARGET"/></template>
						</BannerSlides>
					</template>

				</KeenSlider>
			</template>
		</MiniBanner>

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
import MiniBanner from './MiniBanner.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { Tracker } from '@src/tracking/Tracker';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { useFormModel } from '@src/components/composables/useFormModel';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { FormItem } from '@src/utils/FormItemsBuilder/FormItem';
import FormItemsBuilder from '@src/utils/FormItemsBuilder/FormItemsBuilder';
import { Translator } from '@src/Translator';
import { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import { CloseChoices } from '@src/domain/CloseChoices';
import BannerSlides from '../content/BannerSlides.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';

enum ContentStates {
	Mini = 'wmde-banner-wrapper--mini',
	Expanded = 'wmde-banner-wrapper--expanded'
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
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
const contentState = ref<ContentStates>( ContentStates.Mini );
const formModel = useFormModel();

const localTranslator = inject<Translator>( 'translator' );
const currencyFormatter = inject<Currency>( 'currencyFormatter' );

const localFormItemsBuilder = new FormItemsBuilder( localTranslator, currencyFormatter.euroAmount.bind( currencyFormatter ) );
const amountOptionsFive = localFormItemsBuilder.setAmounts( 5, 15, 25, 50, 100 ).getItems().amounts;
const amountOptionsTen = localFormItemsBuilder.setAmounts( 10, 15, 25, 50, 100 ).getItems().amounts;
const amountOptionsForForm = ref<FormItem[]>( amountOptionsTen );

watch( contentState, async () => emit( 'bannerContentChanged' ) );

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
	emit( 'modalClosed' );
}

function onExpandBanner(): void {
	slideShowStopped.value = true;
	contentState.value = ContentStates.Expanded;

	amountOptionsForForm.value = amountOptionsFive;

	tracker.trackEvent( new MobileMiniBannerExpandedEvent() );
}

function onExpandBannerPreselected(): void {
	slideShowStopped.value = true;

	amountOptionsForForm.value = amountOptionsTen;

	formModel.selectedAmount.value = '10';
	contentState.value = ContentStates.Expanded;
	tracker.trackEvent( new MobileMiniBannerExpandedEvent( 'preselected' ) );
}

const onHideFundsModal = (): void => {
	isFundsModalVisible.value = false;

	if ( contentState.value === ContentStates.Mini ) {
		emit( 'modalClosed' );
	}

	if ( contentState.value === ContentStates.Expanded ) {
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
		onExpandBanner();
	}

	props.pageScroller.scrollIntoView( '.wmde-banner-form' );
};

</script>
