<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MainBanner
			@close="onCloseMain"
			@form-interaction="$emit( 'bannerContentChanged' )"
			:banner-state="bannerState"
			v-if="contentState === ContentStates.Main"
		>
			<template #banner-text>
				<BannerText/>
			</template>

			<template #banner-slides="{ play }: any">
				<KeenSlider :with-navigation="true" :play="play" :interval="10000" :delay="2000">

					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide"/>
					</template>

				</KeenSlider>
			</template>

			<template #progress>
				<ProgressBar amount-to-show-on-right="MISSING"/>
			</template>

			<template #donation-form="{ formInteraction }: any">
				<MultiStepDonation
					:step-controllers="stepControllers"
					@form-interaction="formInteraction"
					:submit-callback="onSubmit"
				>

					<template #[FormStepNames.MainDonationFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<MainDonationForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous">
							<template #label-payment-ppl>
								<span class="wmde-banner-select-group-label with-logos paypal"><PayPalLogo/></span>
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
							:is-current="isCurrent"
							@submit="submit"
							@previous="previous"
						/>
					</template>

				</MultiStepDonation>
			</template>
			<template #footer>
				<FooterAlreadyDonated
					@showFundsModal="onOpenUseOfFunds"
					@clickedAlreadyDonatedLink="onClose( 'MainBanner', CloseChoices.AlreadyDonated )"
				/>
			</template>
		</MainBanner>

		<FundsModal
			:content="useOfFundsContent"
			:visible="isFundsModalVisible"
			@hide="onCloseUseOfFunds"
			@call-to-action="onCloseUseOfFunds"
		/>
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { inject, ref, watch } from 'vue';
import MainBanner from './MainBanner.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/EditableContent/UseOfFundsContent';
import UpgradeToYearlyButtonForm from '@src/components/DonationForm/Forms/UpgradeToYearlyButtonForm.vue';
import BannerSlides from '../content/BannerSlides.vue';
import BannerText from '../content/BannerText.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import FooterAlreadyDonated from '@src/components/Footer/FooterAlreadyDonated.vue';
import { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
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
import VisaLogo from '@src/components/PaymentLogos/VisaLogo.vue';
import MastercardLogo from '@src/components/PaymentLogos/MastercardLogo.vue';
import PayPalLogo from '@src/components/PaymentLogos/PayPalLogo.vue';
import { useBannerHider } from '@src/components/composables/useBannerHider';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import { Tracker } from '@src/tracking/Tracker';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main',
}

enum FormStepNames {
	MainDonationFormStep = 'MainDonationForm',
	UpgradeToYearlyFormStep = 'UpgradeToYearlyForm'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	localCloseTracker: LocalCloseTracker;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'maybeLater', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );
useBannerHider( 800, emit );

const tracker = inject<Tracker>( 'tracker' );

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

const onSubmit = (): void => {
	// special callback function: asking for previous close choices
	const closeChoice = props.localCloseTracker.getItem();
	if ( closeChoice !== '' ) {
		tracker.trackEvent( new BannerSubmitOnReturnEvent( closeChoice ) );
	}
};

function onOpenUseOfFunds(): void {
	isFundsModalVisible.value = true;
	emit( 'modalOpened' );
}

function onCloseUseOfFunds(): void {
	isFundsModalVisible.value = false;
	emit( 'modalClosed' );
}

function onCloseMain(): void {
	onClose( 'MainBanner', CloseChoices.Close );
}

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
	props.localCloseTracker.setItem( feature, userChoice );
}

</script>
