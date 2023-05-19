<template>
    <div class="wmde-banner-wrapper" :class="contentState" >
        <BannerMain
			@close="() => onClose( 'BannerMain', CloseChoices.Close )"
            @form-interaction="$emit( 'bannerContentChanged' )"
            :bannerState="bannerState"
        >
            <template #banner-slides="{ play }: any">
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
						<MainDonationForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous"/>
					</template>

					<template #[FormStepNames.UpgradeToYearlyFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<UpgradeToYearlyButtonForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous">
                            <template #back>
                                <ChevronLeftIcon/>
                            </template>
                        </UpgradeToYearlyButtonForm>
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

		<FundsModal
			:content="useOfFundsContent"
			:is-funds-modal-visible="isFundsModalVisible"
			@hideFundsModal="isFundsModalVisible = false"
		/>

	</div>
</template>

<script setup lang="ts">
import BannerMain from './BannerMain.vue';
import BannerSlides from '../../pad_english/content/BannerSlides.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { ref } from 'vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import CustomAmountForm from '@src/components/DonationForm/Forms/CustomAmountForm.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';
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
import { createSubmittableCustomAmount } from '@src/components/DonationForm/StepControllers/SubmittableCustomAmount';
import { CloseChoices } from '@src/domain/CloseChoices';
import { CloseEvent } from '@src/tracking/events/CloseEvent';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main'
}

enum FormStepNames {
	CustomAmountFormStep = 'CustomAmountForm',
	MainDonationFormStep = 'MainDonationForm',
	UpgradeToYearlyFormStep = 'UpgradeToYearlyForm'
}

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
}
defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const contentState = ref<ContentStates>( ContentStates.Main );
const isFundsModalVisible = ref<boolean>( false );
const formModel = useFormModel();
const stepControllers = [
	createSubmittableMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableUpgradeToYearly( formModel, FormStepNames.CustomAmountFormStep, FormStepNames.MainDonationFormStep ),
	createSubmittableCustomAmount( formModel, FormStepNames.UpgradeToYearlyFormStep )
];

function onClose( feature: string, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
}

</script>
