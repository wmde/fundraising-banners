<template>
	<div class="wmde-b-mobile-banner">

		<header class="wmde-b-mobile-banner__header wmde-c-repel" role="none" data-nowrap>
			<button class="wmde-b-nav-button" @click.prevent="onClose( CloseChoices.Close )" data-icon>
				<span class="visually-hidden">{{ $translate( 'close' ) }}</span>
				<CloseIconMobile/>
			</button>

			<figure>
				<WikiLogo/>
			</figure>

			<div>
				<button class="wmde-b-nav-button" @click.prevent="onBack" data-icon v-if="formStep > 0">
					<span class="visually-hidden">{{ $translate( 'back-button' ) }}</span>
					<FormPreviousIcon/>
				</button>
			</div>
		</header>

		<div class="wmde-b-stacker" :data-index="formStep">
			<div>
				<header class="wmde-b-mobile-banner__progress">
					<ProgressBar :is-visible="bannerState === BannerStates.Visible"/>
				</header>

				<KeenSlider :play="slideshowShouldPlay" :interval="7000">
					<template #slides="{ currentSlide }: any">
						<BannerSlides :current-slide="currentSlide" :play-live-text="bannerState === BannerStates.Visible"/>
					</template>
				</KeenSlider>

				<DonationForm @submit="submitDonationForm" :play-cluster-animation="bannerState === BannerStates.Visible && formStep === 0" :is-current-step="formStep === 0"/>
			</div>

			<div>
				<UpgradeForm @submit="submit" :is-current-step="formStep === 1"/>
			</div>
		</div>

		<footer class="wmde-b-mobile-banner__footer wmde-c-cluster" role="none">
			<button class="wmde-u-link-button wmde-b-icon-text wmde-c-cluster" data-nowrap type="button" @click.prevent="onClose( CloseChoices.AlreadyDonated )">
				<TickIcon/> {{ $translate( 'mini-banner-already-donated-button' ) }}
			</button>
			<button class="wmde-u-link-button wmde-b-icon-text wmde-c-cluster" data-nowrap type="button" @click.prevent="onShowFundsModal">
				<InfoIconStraight/> {{ $translate( 'use-of-funds-link-description' ) }}
			</button>
		</footer>

		<form ref="submitForm" :action="formActions.formAction.value" method="post">
			<SubmitValues/>
		</form>

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
import { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import { computed, inject, ref } from 'vue';
import { Tracker } from '@src/tracking/Tracker';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import { UseOfFundsShownEvent } from '@src/tracking/events/UseOfFundsShownEvent';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import WikiLogo from './WikiLogo.vue';
import ProgressBar from './ProgressBar.vue';
import KeenSlider from '@src/components/Slider2026/KeenSlider.vue';
import DonationForm from './DonationForm.vue';
import UpgradeForm from './UpgradeForm.vue';
import InfoIconStraight from '@src/components/Icons/InfoIconStraight.vue';
import BannerSlides from '../content/BannerSlides.vue';
import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import TickIcon from '@src/components/Icons/TickIcon.vue';
import type { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/EditableContent/UseOfFundsContent';
import FormPreviousIcon from '@src/components/Icons/FormPreviousIcon.vue';
import { useFormAction } from '@src/components/composables/useFormAction';
import { FormActionCollection } from '@src/domain/FormActions';
import SubmitValues from '@src/components/DonationForm/SubComponents/SubmitValues.vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	localCloseTracker: LocalCloseTracker;
}

const props = defineProps<Props>();

const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const tracker = inject<Tracker>( 'tracker' );

const isFundsModalVisible = ref<boolean>( false );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
const formStep = ref<number>( 0 );
const formActions = useFormAction( inject<FormActionCollection>( 'formActions' ) );
const submitForm = ref<HTMLFormElement>( null );
const formModel = useFormModel();

function onClose( userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( 'MiniBanner', userChoice ) );
	emit( 'modalClosed' );
}

const submit = (): void => {
	const closeChoice = props.localCloseTracker.getItem();
	if ( closeChoice !== '' ) {
		tracker.trackEvent( new BannerSubmitOnReturnEvent( closeChoice ) );
	}
};

const submitDonationForm = (): void => {
	if ( formModel.interval.value === Intervals.ONCE.value ) {
		formStep.value = 1;
	} else {
		submit();
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
};

const onBack = (): void => {
	if ( formStep.value === 0 ) {
		return;
	}

	formStep.value--;
};
</script>
