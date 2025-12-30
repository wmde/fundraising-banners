<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MainBanner
			@close="onCloseMain"
			@form-interaction="onFormInteraction"
			v-if="contentState === ContentStates.Main"
			:bannerState="bannerState"
		>
			<template #banner-slides="{ play }: any">
				<div class="wmde-banner-content-headline">
					<span class="wmde-banner-content-headline-text">Ist Ihnen Wikipedia 15 € wert?</span>
				</div>
				<KeenSlider :with-navigation="true" :play="play" :interval="5000">

					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide"/>
					</template>

					<template #left-icon>
						<ChevronLeftIcon :fill="'#990a00'"/>
					</template>

					<template #right-icon>
						<ChevronRightIcon :fill="'#990a00'"/>
					</template>

				</KeenSlider>
			</template>

			<template #progress>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</template>

			<template #donation-form="{ formInteraction }: any">
				<MultiStepDonation :step-controllers="stepControllers" @form-interaction="formInteraction">

					<template #[FormStepNames.MainDonationFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<MainDonationForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous">

							<template #label-payment-ppl>
								<span class="wmde-banner-select-group-label with-logos paypal"><PayPalLogo/></span>
							</template>

							<template #label-payment-bez>
								<span class="wmde-banner-select-group-label with-logos sepa"><SepaLogo/></span>
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
							@submit="submit"
							:is-current="isCurrent"
							@previous="previous"
						>
							<template #back>
								<ChevronLeftIcon/>
							</template>
						</UpgradeToYearlyButtonForm>
					</template>

				</MultiStepDonation>
			</template>

			<template #footer>
				<BannerFooter @showFundsModal="onShowFundsModal"/>
			</template>
		</MainBanner>

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
					@click="() => onSoftCloseClose( timer, 'SoftClose', CloseChoices.AlreadyDonated )">
					{{ $translate( 'soft-close-button-already-donated' ) }}
				</button>
			</template>
		</SoftClose>

		<FundsModal
			:content="useOfFundsContent"
			:visible="isFundsModalVisible"
			@hide="onHideFundsModal"
			@call-to-action="onHideFundsModal"
		/>

	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { nextTick, ref, watch } from 'vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/EditableContent/UseOfFundsContent';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import MainBanner from './MainBanner.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import BannerSlides from '../content/BannerSlidesVar.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import ChevronRightIcon from '@src/components/Icons/ChevronRightIcon.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import UpgradeToYearlyButtonForm from '@src/components/DonationForm/Forms/UpgradeToYearlyButtonForm.vue';
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
import MastercardLogo from '@src/components/PaymentLogos/MastercardLogo.vue';
import SepaLogo from '@src/components/PaymentLogos/SepaLogo.vue';
import VisaLogo from '@src/components/PaymentLogos/VisaLogo.vue';
import PayPalLogo from '@src/components/PaymentLogos/PayPalLogo.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

enum FormStepNames {
	MainDonationFormStep = 'MainDonationForm',
	UpgradeToYearlyFormStep = 'UpgradeToYearlyForm'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	remainingImpressions: number;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const isFundsModalVisible = ref<boolean>( false );
const contentState = ref<ContentStates>( ContentStates.Main );
const formModel = useFormModel();
const stepControllers = [
	createSubmittableMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableUpgradeToYearly( formModel, FormStepNames.MainDonationFormStep, FormStepNames.MainDonationFormStep )
];

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

function onFormInteraction(): void {
	nextTick( () => {
		emit( 'bannerContentChanged' );
	} );
}

function onShowFundsModal(): void {
	isFundsModalVisible.value = true;
	emit( 'modalOpened' );
}

function onHideFundsModal(): void {
	isFundsModalVisible.value = false;
	emit( 'modalClosed' );
}

function onSoftCloseClose( timer: number, feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	window.clearInterval( timer );
	onClose( feature, userChoice );
}

function onCloseMain(): void {
	if ( props.remainingImpressions > 0 ) {
		contentState.value = ContentStates.SoftClosing;
	} else {
		onClose( 'MainBanner', CloseChoices.Close );
	}
}

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
}

</script>
