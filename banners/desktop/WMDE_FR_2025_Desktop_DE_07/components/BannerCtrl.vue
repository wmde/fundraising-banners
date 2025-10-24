<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<MainBanner
			@form-interaction="$emit( 'bannerContentChanged' )"
			v-if="contentState === ContentStates.Main"
			:bannerState="bannerState"
		>
			<template #close-button>
				<ButtonClose @close="onCloseMain"/>
			</template>

			<template #banner-title>
				<BannerTitle/>
			</template>

			<template #banner-text>
				<BannerText/>
			</template>

			<template #banner-slides="{ play }: any">
				<KeenSlider :with-navigation="true" :play="play" :interval="10000" :delay="2000" :navigation-color="'#ffffff'">

					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide"/>
					</template>

				</KeenSlider>
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
								<span class="wmde-banner-select-group-label with-logos paypal">
									<PayPalIcon/><span>Paypal</span>
								</span>
							</template>

							<template #label-payment-mcp>
								<span class="wmde-banner-select-group-label with-logos credit-cards">
									<MasterCardIcon/><span>Kreditkarte</span>
								</span>
							</template>

							<template #label-payment-ueb>
								<span class="wmde-banner-select-group-label with-logos bank-transfer">
									<BankTransferIcon/><span>Überweisung</span>
								</span>
							</template>

							<template #label-payment-bez>
								<span class="wmde-banner-select-group-label with-logos bank-transfer">
									<DirectDebitIcon/><span>Lastschrift</span>
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
						/>
					</template>

				</MultiStepDonation>
			</template>

			<template #footer>
				<FooterAlreadyDonated
					@showFundsModal="onModalOpened"
					@clickedAlreadyDonatedLink="onClose( 'MainBanner', CloseChoices.AlreadyDonated )"
				/>
			</template>

		</MainBanner>

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
import { inject, ref, watch } from 'vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import MainBanner from './MainBanner.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import BannerText from '../content/BannerText.vue';
import BannerSlides from '../content/BannerSlides.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import UpgradeToYearlyButtonForm from '@src/components/DonationForm/Forms/UpgradeToYearlyButtonForm.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
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
import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import FooterAlreadyDonated from '@src/components/Footer/FooterAlreadyDonated.vue';
import { LocalCloseTracker } from '@src/utils/LocalCloseTracker';
import { BannerSubmitOnReturnEvent } from '@src/tracking/events/BannerSubmitOnReturnEvent';
import { Tracker } from '@src/tracking/Tracker';
import { useBannerHider } from '@src/components/composables/useBannerHider';
import BannerTitle from '../content/BannerTitle.vue';
import BankTransferIcon from '@src/components/PaymentLogos/BankTransferIcon.vue';
import PayPalIcon from '@src/components/PaymentLogos/PayPalIcon.vue';
import DirectDebitIcon from '@src/components/PaymentLogos/DirectDebitIcon.vue';
import MasterCardIcon from '@src/components/PaymentLogos/MasterCardIcon.vue';

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
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );
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

function onCloseMain(): void {
	onClose( 'MainBanner', CloseChoices.Close );
}

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

</script>
