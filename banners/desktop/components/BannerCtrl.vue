<template>
	<BannerConductor v-bind="bannerConductorProps">

		<template #banner="{ bannerState, bannerContentChanged, bannerClosed }: any">
			<div class="wmde-banner-wrapper" :class="contentState">
				<BannerMain
					@close="() => onCloseMain( bannerContentChanged )"
					@form-interaction="bannerContentChanged"
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

						</MultiStepDonation>
					</template>

					<template #footer>
						<BannerFooter @showFundsModal="isFundsModalVisible = true"/>
					</template>
				</BannerMain>

				<SoftClose
					v-if="contentState === ContentStates.SoftClosing"
					@close="() => bannerClosed( 'SoftClose', CloseChoices.Close )"
					@maybe-later="() => bannerClosed( 'SoftClose', CloseChoices.MaybeLater )"
					@time-out-close="() => bannerClosed( 'SoftClose', CloseChoices.TimeOut )"
				/>

				<FundsModal
					:content="useOfFundsContent"
					:is-funds-modal-visible="isFundsModalVisible"
					@hideFundsModal="isFundsModalVisible = false"
				/>
			</div>
		</template>

	</BannerConductor>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import { useFormModel } from '@src/components/composables/useFormModel';
import {
	createSubmittableMainDonationForm
} from '@src/components/DonationForm/StepControllers/SubmittableMainDonationForm';
import {
	createSubmittableUpgradeToYearly
} from '@src/components/DonationForm/StepControllers/SubmittableUpgradeToYearly';
import { createSubmittableCustomAmount } from '@src/components/DonationForm/StepControllers/SubmittableCustomAmount';
import { CloseChoices } from '@src/domain/CloseChoices';
import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import { BannerConductorProps } from '@src/components/BannerConductor/BannerConductorProps';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

enum FormStepNames {
	CustomAmountFormStep = 'CustomAmountForm',
	MainDonationFormStep = 'MainDonationForm',
	UpgradeToYearlyFormStep = 'UpgradeToYearlyForm'
}

interface Props {
	bannerConductorProps: BannerConductorProps;
	useOfFundsContent: useOfFundsContentInterface;
}

defineProps<Props>();

const isFundsModalVisible = ref<boolean>( false );
const contentState = ref<ContentStates>( ContentStates.Main );
const formModel = useFormModel();
const stepControllers = [
	createSubmittableMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableUpgradeToYearly( formModel, FormStepNames.CustomAmountFormStep, FormStepNames.MainDonationFormStep ),
	createSubmittableCustomAmount( formModel, FormStepNames.UpgradeToYearlyFormStep )
];

function onCloseMain( bannerContentChangedCallback: Function ): void {
	contentState.value = ContentStates.SoftClosing;
	bannerContentChangedCallback();
}

</script>
