<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<BannerMain
			@close="onCloseMain"
			@form-interaction="$emit( 'bannerContentChanged' )"
			v-if="contentState === ContentStates.Main"
			:bannerState="bannerState"
		>
			<template #banner-text>
				<BannerText/>
			</template>

			<template #banner-slides="{ play }: any">
				<KeenSlider :with-navigation="true" :play="play" :interval="5000">

					<template #slides="{ currentSlide }: any">
						<BannerSlides :currentSlide="currentSlide"/>
					</template>

				</KeenSlider>
			</template>

			<template #progress>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</template>

			<template #donation-form="{ formInteraction }: any">
				<MultiStepDonation :step-controllers="stepControllers" @form-interaction="formInteraction">
                    <template #[FormStepNames.MainDonationFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
                        <MainDonationForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous"/>
                    </template>

                    <template #[FormStepNames.UpgradeToYearlyFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
                        <UpgradeToYearlyForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous"/>
                    </template>

                    <template #[FormStepNames.CustomAmountFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
                        <CustomAmountForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous"/>
                    </template>

					<template #[FormStepNames.AddressTypeFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<AddressTypeForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous"/>
					</template>
				</MultiStepDonation>
			</template>

			<template #footer>
				<BannerFooter @showFundsModal="isFundsModalVisible = true" />
			</template>
		</BannerMain>

		<SoftClose
			v-if="contentState === ContentStates.SoftClosing"
			@close="() => onClose( TrackingFeatures.SoftClose, CloseChoices.Close )"
			@maybe-later="() => onClose( TrackingFeatures.SoftClose, CloseChoices.MaybeLater )"
			@time-out-close="() => onClose( TrackingFeatures.SoftClose, CloseChoices.TimeOut )"
		/>

		<FundsModal
			:content="useOfFundsContent"
			:is-funds-modal-visible="isFundsModalVisible"
			@hideFundsModal="isFundsModalVisible = false"
		/>
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { ref, watch } from 'vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import BannerMain from './BannerMain.vue';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import BannerText from '../content/BannerText.vue';
import BannerSlides from '../content/BannerSlides.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import UpgradeToYearlyForm from '@src/components/DonationForm/Forms/UpgradeToYearlyForm.vue';
import CustomAmountForm from '@src/components/DonationForm/Forms/CustomAmountForm.vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import { createSubmittableAddressType } from '@src/components/DonationForm/StepControllers/SubmittableAddressType';
import {
	createIntermediateMainDonationForm
} from '@src/components/DonationForm/StepControllers/IntermediateMainDonationForm';
import {
	createIntermediateUpgradeToYearly
} from '@src/components/DonationForm/StepControllers/IntermediateUpgradeToYearly';
import { createIntermediateCustomAmount } from '@src/components/DonationForm/StepControllers/IntermediateCustomAmount';
import AddressTypeForm from '@src/components/DonationForm/Forms/AddressTypeForm.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { TrackingFeatures } from '@src/domain/TrackingFeatures';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

enum FormStepNames {
	CustomAmountFormStep = 'CustomAmountForm',
	MainDonationFormStep = 'MainDonationForm',
	UpgradeToYearlyFormStep = 'UpgradeToYearlyForm',
	AddressTypeFormStep = 'AddressTypeFormStep'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
}

defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const isFundsModalVisible = ref<boolean>( false );
const contentState = ref<ContentStates>( ContentStates.Main );

const formModel = useFormModel();

const stepControllers = [
	createIntermediateMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep, FormStepNames.AddressTypeFormStep ),
	createIntermediateUpgradeToYearly( formModel,
		FormStepNames.CustomAmountFormStep,
		FormStepNames.AddressTypeFormStep,
		FormStepNames.MainDonationFormStep ),
	createIntermediateCustomAmount( formModel, FormStepNames.AddressTypeFormStep, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableAddressType( formModel, FormStepNames.MainDonationFormStep )
];

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

function onCloseMain(): void {
	contentState.value = ContentStates.SoftClosing;
}

function onClose( feature: string, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
}

</script>
