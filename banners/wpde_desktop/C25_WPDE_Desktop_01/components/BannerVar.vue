<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<SetCookieImage v-if="showSetCookieImage"/>
		<SetAlreadyDonatedCookieImage v-if="showAlreadyDonatedCookieImage"/>
		<SetMaybeLaterCookieImage v-if="showMaybeLaterCookieImage"/>
		<MainBanner
			@close="onCloseMain"
			@form-interaction="$emit( 'bannerContentChanged' )"
			:bannerState="bannerState"
			v-if="contentState === ContentStates.Main"
		>
			<template #banner-title>
				<BannerTitle/>
			</template>

			<template #banner-text>
				<BannerText/>
			</template>

			<template #banner-slides="{ play }: any">
				<KeenSlider :with-navigation="true" :play="play" :interval="10000">

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
				<MultiStepDonation
					:step-controllers="stepControllers"
					@form-interaction="formInteraction"
				>

					<template #[FormStepNames.MainDonationFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<MainDonationForm
							:page-index="pageIndex"
							@submit="submit"
							:is-current="isCurrent"
							@previous="previous"
							:hasIntervalCheering="true"
						>
							<template #label-payment-ppl>
								<span class="wmde-banner-select-group-label with-logos paypal"><PayPalLogo/></span>
							</template>

							<template #label-payment-bez>
								<span class="wmde-banner-select-group-label with-logos sepa"><SepaLogo/></span>
							</template>

							<template #label-payment-ueb>
								<span class="wmde-banner-select-group-label with-logos bank-transfer">
									<BankTransferIcon/><span>Überweisung</span>
								</span>
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
import { ref, watch } from 'vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/EditableContent/UseOfFundsContent';
import MainBanner from './MainBanner.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import UpgradeToYearlyButtonForm from '@src/components/DonationForm/Forms/UpgradeToYearlyButtonForm.vue';
import BannerSlides from '../content/BannerSlides.vue';
import BannerText from '../content/BannerText.vue';
import BannerTitle from '../content/BannerTitle.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationFormIntervalCheering.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@src/components/Icons/ChevronRightIcon.vue';
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
import SetCookieImage from '@src/components/SetWPDECookieImage/SetCookieImage.vue';
import FooterAlreadyDonated from '@src/components/Footer/FooterAlreadyDonated.vue';
import SetAlreadyDonatedCookieImage from '@src/components/SetWPDECookieImage/SetAlreadyDonatedCookieImage.vue';
import PayPalLogo from '@src/components/PaymentLogos/PayPalLogo.vue';
import VisaLogo from '@src/components/PaymentLogos/VisaLogo.vue';
import MastercardLogo from '@src/components/PaymentLogos/MastercardLogo.vue';
import SepaLogo from '@src/components/PaymentLogos/SepaLogo.vue';
import BankTransferIcon from '@src/components/PaymentLogos/BankTransferIcon.vue';
import SetMaybeLaterCookieImage from '@src/components/SetWPDECookieImage/SetMaybeLaterCookieImage.vue';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main'
}

enum FormStepNames {
	MainDonationFormStep = 'MainDonationForm',
	UpgradeToYearlyFormStep = 'UpgradeToYearlyForm'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
}

defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged', 'modalOpened', 'modalClosed' ] );

const isFundsModalVisible = ref<boolean>( false );
const showSetCookieImage = ref<boolean>( false );
const showAlreadyDonatedCookieImage = ref<boolean>( false );
const showMaybeLaterCookieImage = ref<boolean>( false );
const contentState = ref<ContentStates>( ContentStates.Main );
const formModel = useFormModel();
const stepControllers = [
	createSubmittableMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableUpgradeToYearly( formModel, FormStepNames.MainDonationFormStep, FormStepNames.MainDonationFormStep )
];

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

function onCloseMain(): void {
	onClose( 'MainBanner', CloseChoices.Close );
}

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );

	switch ( userChoice ) {
		case CloseChoices.MaybeLater:
			showMaybeLaterCookieImage.value = true;
			break;
		case CloseChoices.Close:
		case CloseChoices.Hide:
		case CloseChoices.TimeOut:
			showSetCookieImage.value = true;
			break;
		case CloseChoices.AlreadyDonated:
			showAlreadyDonatedCookieImage.value = true;
			break;

	}
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
