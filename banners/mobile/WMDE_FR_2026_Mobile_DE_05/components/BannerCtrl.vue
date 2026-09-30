<template>
	<div class="wmde-b-mobile-banner" :class="contentState">
		<MiniBanner
			@close="() => onMiniClose( 'MiniBanner', CloseChoices.Close )"
			@show-full-page-banner="onshowFullPageBanner"
			@show-full-page-banner-preselected="onshowFullPageBannerPreselected"
			@showFundsModal="onShowFundsModal( 'MiniBanner' )"
			@already-donated-clicked="onMiniClose( 'MiniBanner', CloseChoices.AlreadyDonated )"
			:is-visible="contentState === ContentStates.Mini"
		>
			<template #banner-slider>
				<KeenSlider :with-navigation="false" :play="slideshowShouldPlay" :interval="7000">
					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide" :play-live-text="contentState === ContentStates.Mini"/>
					</template>
				</KeenSlider>
			</template>

			<template #banner-text>
				<BannerText :play-live-text="contentState === ContentStates.Mini"/>
			</template>
		</MiniBanner>

		<ModalBanner
			@showFundsModal="onShowFundsModal( 'FullPageBanner' )"
			@close="() => onFullPageClose( 'FullPageBanner', CloseChoices.Hide )"
			:is-visible="contentState === ContentStates.FullPage"
		>
			<template #banner-text>
				<BannerText :play-live-text="contentState === ContentStates.FullPage"/>
			</template>

			<template #donation-form>
				<DonationForm ref="donationForm" :amounts="amountOptionsForForm" @form-interaction="$emit( 'bannerContentChanged' );" @submit="$emit( 'bannerSubmitted' )"/>
			</template>

			<template #footer>
				<footer role="none" class="wmde-c-flow">
					<div class="wmde-b-callout wmde-b-icon-text wmde-c-cluster" data-radius>
						<HeartIcon/> Vielen Dank, dass Sie dabei sind
					</div>
					<div class="wmde-c-cluster">
						<ContentCopier :label="$translate( 'donation-account' )" value="Wikimedia e. V."/>
						<ContentCopier label="IBAN" value="DE09 3702 0500 0003 2873 00" copy-value="DE09370205000003287300"/>
						<ContentCopier label="BIC" value="BFSWDE33XXX"/>
					</div>
				</footer>
			</template>
		</ModalBanner>

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
import ModalBanner from './ModalBanner.vue';
import MiniBanner from './MiniBanner.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import type { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/EditableContent/UseOfFundsContent';
import type { PageScroller } from '@src/utils/PageScroller/PageScroller';
import DonationForm from './DonationForm.vue';
import BannerText from '../content/BannerText.vue';
import BannerSlides from '../content/BannerSlides.vue';
import KeenSlider from '@src/components/Slider2026/KeenSlider.vue';
import type { Tracker } from '@src/tracking/Tracker';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { useFormModel } from '@src/components/composables/useFormModel';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import type { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import type { FormItem } from '@src/utils/FormItemsBuilder/FormItem';
import FormItemsBuilder from '@src/utils/FormItemsBuilder/FormItemsBuilder';
import type { Translator } from '@src/Translator';
import type { Currency } from '@src/utils/DynamicContent/formatters/Currency';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import ContentCopier from '@src/components/ContentCopier/ContentCopier.vue';
import HeartIcon from '@src/components/Icons/HeartIcon.vue';

enum ContentStates {
	Mini = 'wmde-b-mobile-banner--mini',
	FullPage = 'wmde-b-mobile-banner--full-page'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	pageScroller: PageScroller;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerSubmitted', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const tracker = inject<Tracker>( 'tracker' );

const donationForm = ref<any>( null );
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

function onshowFullPageBanner(): void {
	slideShowStopped.value = true;
	contentState.value = ContentStates.FullPage;
	emit( 'modalOpened' );

	amountOptionsForForm.value = amountOptionsFive;

	tracker.trackEvent( new MobileMiniBannerExpandedEvent() );

	donationForm.value.focusFirstForm();
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
