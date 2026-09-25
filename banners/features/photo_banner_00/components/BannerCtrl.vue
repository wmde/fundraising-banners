<template>
	<div class="wmde-b-mobile-banner" :class="contentState">
		<header class="wmde-b-mobile-banner__header wmde-c-repel" role="none" data-nowrap>
			<div class="wmde-c-cluster">
				<button class="wmde-b-nav-button" @click.prevent="onShowFundsModal" :title="$translate( 'use-of-funds-link-description' )">
					<InfoIconStraight data-icon/> Warum spenden?
				</button>

				<button class="wmde-b-nav-button" @click.prevent="onClose( CloseChoices.AlreadyDonated )">
					<TickIcon data-icon/> {{ $translate( 'mini-banner-already-donated-button' ) }}
				</button>
			</div>

			<div class="wmde-c-cluster" data-right>
				<button class="wmde-b-nav-button" @click.prevent="onClose( CloseChoices.Close )" data-icon>
					<span class="visually-hidden">{{ $translate( 'close' ) }}</span>
					<CloseIconMobile/>
				</button>
			</div>
		</header>

		<MiniBanner
			@show-full-banner="onshowFullBanner"
			:current-slide="sliderPage"
			:form-is-visible="contentState === ContentStates.Full"
		>
			<template #banner-slider>
				<KeenSlider
					ref="slider"
					:with-navigation="false"
					:with-pagination="false"
					:play="slideshowShouldPlay"
					:interval="7000"
					@slide-changed="onSlideChanged"
				>
					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide"/>
					</template>
				</KeenSlider>
			</template>

			<template #banner-text>
				<BannerText/>
			</template>

			<template #form-text>
				<FormText/>
			</template>

			<template #slider-pagination>
				<SliderPagination :slides-count="4" :current-slide="sliderPage" @previous="sliderPrevious" @next="sliderNext" @go-to-slide="sliderGoToSlide"/>
			</template>

		</MiniBanner>

		<DonationForm ref="donationForm" @form-interaction="$emit( 'bannerContentChanged' );" @submit="$emit( 'bannerSubmitted' )"/>

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
import type { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/EditableContent/UseOfFundsContent';
import type { PageScroller } from '@src/utils/PageScroller/PageScroller';
import BannerText from '../content/BannerText.vue';
import BannerSlides from '../content/BannerSlides.vue';
import KeenSlider from '@src/components/Slider2026/KeenSlider.vue';
import type { Tracker } from '@src/tracking/Tracker';
import { MobileMiniBannerExpandedEvent } from '@src/tracking/events/MobileMiniBannerExpandedEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import type { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import SliderPagination from './SliderPagination.vue';
import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import InfoIconStraight from '@src/components/Icons/InfoIconStraight.vue';
import TickIcon from '@src/components/Icons/TickIcon.vue';
import FormText from '../content/FormText.vue';
import DonationForm from './DonationForm.vue';

enum ContentStates {
	Mini = 'wmde-b-mobile-banner--mini',
	Full = 'wmde-b-mobile-banner--full'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	pageScroller: PageScroller;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerSubmitted', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const tracker = inject<Tracker>( 'tracker' );

const slider = ref<any>( null );
const sliderPage = ref<number>( 0 );
const donationForm = ref<any>( null );
const isFundsModalVisible = ref<boolean>( false );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
const contentState = ref<ContentStates>( ContentStates.Mini );
const contentStateFeature = computed<TrackingFeatureName>( () => contentState.value === ContentStates.Mini ? 'MiniBanner' : 'FullPageBanner' );

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

const onSlideChanged = ( newIndex: number ): void => {
	sliderPage.value = newIndex;
};

const sliderPrevious = (): void => slider.value.goToPreviousSlide();
const sliderNext = (): void => slider.value.goToNextSlide();
const sliderGoToSlide = ( idx: number ): void => slider.value.goToSlide( idx );

function onClose( userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( contentStateFeature.value, userChoice ) );

	if ( contentState.value === ContentStates.Full ) {
		emit( 'modalClosed' );
	}
}

function onshowFullBanner(): void {
	slideShowStopped.value = true;
	contentState.value = ContentStates.Full;
	emit( 'modalOpened' );
	tracker.trackEvent( new MobileMiniBannerExpandedEvent() );
}

const onHideFundsModal = (): void => {
	isFundsModalVisible.value = false;

	if ( contentState.value === ContentStates.Mini ) {
		emit( 'modalClosed' );
	}

	if ( contentState.value === ContentStates.Full ) {
		props.pageScroller.scrollIntoView( '.wmde-banner-form' );
	}
};

const onShowFundsModal = (): void => {
	isFundsModalVisible.value = true;
	tracker.trackEvent( new UseOfFundsShownEvent( contentStateFeature.value ) );

	if ( contentState.value === ContentStates.Mini ) {
		emit( 'modalOpened' );
	}
};

const onFundsModalCallToAction = (): void => {
	isFundsModalVisible.value = false;

	if ( contentState.value === ContentStates.Mini ) {
		onshowFullBanner();
	}

	props.pageScroller.scrollIntoView( '.wmde-banner-form' );
};

</script>
