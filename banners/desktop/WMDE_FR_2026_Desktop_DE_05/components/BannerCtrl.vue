<template>
	<div class="wmde-c-desktop-banner">

		<header role="none" class="wmde-c-desktop-banner__header wmde-c-cluster" data-right>
			<button class="wmde-b-nav-button" @click.prevent="() => onClose( 'MainBanner', CloseChoices.Close )" data-icon>
				<span class="visually-hidden">{{ $translate( 'close' ) }}</span>
				<CloseIconMobile/>
			</button>
		</header>

		<div class="wmde-c-desktop-banner__message">
			<div class="wmde-b-message wmde-c-flow" data-bordered>
				<button class="wmde-b-skip-link" @click="onFocusMainForm">
					{{ $translate( 'skip-link' ) }}
				</button>

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

		<header role="none" class="wmde-c-desktop-banner__back wmde-c-cluster">
			<button class="wmde-b-nav-button" @click.prevent="onBack" data-icon v-if="formStep > 0">
				<span class="visually-hidden">{{ $translate( 'back-button' ) }}</span>
				<FormPreviousIcon/>
			</button>
		</header>

		<div class="wmde-c-desktop-banner__form wmde-c-flow">
			<DonationForm ref="donationForm" @form-interaction="onFormInteraction" @submit="$emit( 'bannerSubmitted' )"/>
		</div>

		<footer role="none" class="wmde-c-desktop-banner__footer-left wmde-c-repel wmde-b-footer">
			<div class="wmde-c-cluster">
				<ContentCopier :label="$translate( 'donation-account' )" value="Wikimedia e. V."/>
				<ContentCopier label="BIC" value="BFSWDE33XXX"/>
				<ContentCopier label="IBAN" value="DE09 3702 0500 0003 2873 00" copy-value="DE09370205000003287300"/>
			</div>
			<button class="wmde-u-link-button" @click="() => onClose( 'MainBanner', CloseChoices.AlreadyDonated )">
				<TickIcon/> {{ $translate( 'already-donated-link' ) }}
			</button>
		</footer>

		<footer role="none" class="wmde-c-desktop-banner__footer-right wmde-b-footer">
			<button class="wmde-u-link-button" @click="onShowFundsModal">
				{{ $translate( 'use-of-funds-link' ) }}
			</button>
		</footer>

		<FundsModal
			:content="useOfFundsContent"
			:visible="isFundsModalVisible"
			@hide="onHideFundsModal"
			@call-to-action="onHideFundsModal"
			:aria-hidden="!isFundsModalVisible"
		/>
	</div>

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
const formStep = computed<number>( () => donationForm.value?.step );

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

function onShowFundsModal(): void {
	isFundsModalVisible.value = true;
	emit( 'modalOpened' );
}

const onFormInteraction = (): void => {
	slideShowStopped.value = true;
	emit( 'bannerContentChanged' );
};

const onBack = (): void => donationForm.value.onBack();
const onFocusMainForm = (): void => donationForm.value.focusMainForm();

</script>
