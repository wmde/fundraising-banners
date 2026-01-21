<template>
	<div class="wmde-b-main">
		<CloseButton @click="onClose( 'MainBanner', CloseChoices.Close )"/>
		<header class="wmde-b-header">
			<WikiLogo/>
			<ProgressBar/>
		</header>

		<KeenSlider :play="slideshowShouldPlay" :interval="7000">
			<template #slides="{ currentSlide }: any">
				<BannerSlides
					:current-slide="currentSlide"
					:play-live-text="true"
				/>
			</template>
		</KeenSlider>

		<DonationForm :submit-callback="onSubmit"/>

		<footer class="wmde-b-foot">
			<button class="wmde-u-link-button" type="button" @click.prevent="onClose( 'MainBanner', CloseChoices.AlreadyDonated )">{{ $translate( 'already-donated-button' ) }}</button>
			<button class="wmde-u-link-button wmde-b-icon-text" type="button" @click.prevent="onShowFundsModal"><InfoIconStraight/> {{ $translate( 'use-of-funds-button' ) }}</button>
		</footer>

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
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/EditableContent/UseOfFundsContent';
import { PageScroller } from '@src/utils/PageScroller/PageScroller';
import { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import { computed, inject, ref } from 'vue';
import { Tracker } from '@src/tracking/Tracker';
import { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import CloseButton from './Variant/CloseButton.vue';
import WikiLogo from './Variant/WikiLogo.vue';
import ProgressBar from './Variant/ProgressBar.vue';
import KeenSlider from './Variant/KeenSlider.vue';
import DonationForm from './Variant/DonationForm.vue';
import InfoIconStraight from '@src/components/Icons/InfoIconStraight.vue';
import BannerSlides from '../content/BannerSlidesVar.vue';

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	pageScroller: PageScroller;
	localCloseTracker: LocalCloseTracker;
}

const props = defineProps<Props>();

const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const tracker = inject<Tracker>( 'tracker' );

const isFundsModalVisible = ref<boolean>( false );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
	emit( 'modalClosed' );
}

const onSubmit = (): void => {
	const closeChoice = props.localCloseTracker.getItem();
	if ( closeChoice !== '' ) {
		tracker.trackEvent( new BannerSubmitOnReturnEvent( closeChoice ) );
	}
};

const onHideFundsModal = (): void => {
	isFundsModalVisible.value = false;
	emit( 'modalClosed' );
};

const onShowFundsModal = (): void => {
	isFundsModalVisible.value = true;
	tracker.trackEvent( new UseOfFundsShownEvent( 'MainBanner' ) );
	emit( 'modalOpened' );
};

const onFundsModalCallToAction = (): void => {
	isFundsModalVisible.value = false;

	props.pageScroller.scrollIntoView( '.wmde-banner-form' );
};
</script>
