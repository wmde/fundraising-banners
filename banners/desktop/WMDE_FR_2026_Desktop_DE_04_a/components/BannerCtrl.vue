<template>
	<div class="wmde-c-desktop-banner">

		<header role="none" class="wmde-c-desktop-banner__header wmde-b-nav" data-right>
			<button @click.prevent="() => onClose( 'MainBanner', CloseChoices.Close )" data-icon>
				<span class="visually-hidden">{{ $translate( 'close' ) }}</span>
				<CloseIconMobile/>
			</button>
		</header>

		<div class="wmde-c-desktop-banner__message">
			<div class="wmde-b-message wmde-c-flow" data-bordered>
				<div class="wmde-b-message__title wmde-c-flow">
					<BannerTitle/>
				</div>
				<div v-if="!onLargeScreen" class="wmde-b-message__slideshow">
					<KeenSlider :with-navigation="true" :play="slideshowShouldPlay" :interval="10000" :delay="2000">
						<template #slides="{ currentSlide }: any">
							<BannerSlides :currentSlide="currentSlide"/>
						</template>
					</KeenSlider>
				</div>
				<div class="wmde-b-message__text wmde-c-flow" :class="{ 'visually-hidden' : !onLargeScreen }">
					<BannerText :banner-state="bannerState"/>
				</div>
			</div>
		</div>

		<header role="none" class="wmde-c-desktop-banner__back wmde-b-nav">
			<button @click.prevent="onBack" data-icon v-if="formStep > 0">
				<span class="visually-hidden">{{ $translate( 'back-button' ) }}</span>
				<FormPreviousIcon/>
			</button>
		</header>

		<div class="wmde-c-desktop-banner__form wmde-c-flow">
			<DonationForm ref="donationForm" @form-interaction="$emit( 'bannerContentChanged' )"/>
		</div>

		<footer role="none" class="wmde-c-desktop-banner__footer-left wmde-c-repel wmde-b-footer">
			<div class="wmde-c-cluster">
				<ContentCopier :label="$translate( 'donation-account' )" value="Wikimedia e. V."/>
				<ContentCopier label="BIC" value="BFSWDE33XXX"/>
				<ContentCopier label="IBAN" value="DE09 3702 0500 0003 2873 00" copy-value="DE09370205000003287300"/>
			</div>
			<button class="wmde-u-link-button">
				<TickIcon/> {{ $translate( 'already-donated-link' ) }}
			</button>
		</footer>

		<footer role="none" class="wmde-c-desktop-banner__footer-right wmde-b-footer">
			<button class="wmde-u-link-button">
				{{ $translate( 'use-of-funds-link' ) }}
			</button>
		</footer>

	</div>

	<FundsModal
		:content="useOfFundsContent"
		:visible="isFundsModalVisible"
		@hide="onHideFundsModal"
		@call-to-action="onHideFundsModal"
	/>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { computed, ref, watch } from 'vue';
import type { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/EditableContent/UseOfFundsContent';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import BannerTitle from '../content/BannerTitle.vue';
import BannerText from '../content/BannerText.vue';
import BannerSlides from '../content/BannerSlides.vue';
import KeenSlider from '@src/components/Slider2026/KeenSlider.vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { createSubmittableMainDonationForm } from '@src/components/DonationForm/StepControllers/SubmittableMainDonationForm';
import { createSubmittableUpgradeToYearly } from '@src/components/DonationForm/StepControllers/SubmittableUpgradeToYearly';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import type { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { useBannerHider } from '@src/components/composables/useBannerHider';
import CloseIconMobile from '@src/components/Icons/CloseIconMobile.vue';
import FormPreviousIcon from '@src/components/Icons/FormPreviousIcon.vue';
import ContentCopier from '@src/components/ContentCopier/ContentCopier.vue';
import TickIcon from '@src/components/Icons/TickIcon.vue';
import { useDisplaySwitch } from '@src/components/composables/useDisplaySwitch';
import DonationForm from './DonationForm.vue';

enum ContentStates {
	Main = 'wmde-banner__content--main',
}

enum FormStepNames {
	MainDonationFormStep = 'MainDonationForm',
	UpgradeToYearlyFormStep = 'UpgradeToYearlyForm'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
}

const props = defineProps<Props>();

const emit = defineEmits( [ 'bannerClosed', 'bannerSubmitted', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

useBannerHider( 800, emit );

const donationForm = ref<any>( null );
const isFundsModalVisible = ref<boolean>( false );
const contentState = ref<ContentStates>( ContentStates.Main );
const onLargeScreen = useDisplaySwitch( 1300 );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
const formModel = useFormModel();
const formStep = computed<number>( () => donationForm.value?.step );
const stepControllers = [
	createSubmittableMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableUpgradeToYearly( formModel, FormStepNames.MainDonationFormStep, FormStepNames.MainDonationFormStep )
];

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
}

function onHideFundsModal(): void {
	isFundsModalVisible.value = false;
	emit( 'modalClosed' );
}

function onModalOpened(): void {
	isFundsModalVisible.value = true;
	emit( 'modalOpened' );
}

const onBack = (): void => donationForm.value.onBack();

</script>
