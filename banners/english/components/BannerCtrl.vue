<template>
    <div class="wmde-banner-wrapper" :class="contentState">
        <BannerMain
            @close="onCloseMain"
            :banner-state="bannerState"
            v-if="contentState === ContentStates.Main"
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
                <BannerFooter
                    @showFundsModal="isFundsModalVisible = true"
                />
            </template>
        </BannerMain>

		<SoftClose
			v-if="contentState === ContentStates.SoftClosing"
			@close="() => onClose( 'SoftClose', CloseChoices.Close )"
			@maybe-later="() => onClose( 'SoftClose', CloseChoices.MaybeLater )"
			@time-out-close="() => onClose( 'SoftClose', CloseChoices.TimeOut )"
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
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import { ref, watch } from 'vue';
import BannerMain from './BannerMain.vue';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import CustomAmountForm from '@src/components/DonationForm/Forms/CustomAmountForm.vue';
import UpgradeToYearlyForm from '@src/components/DonationForm/Forms/UpgradeToYearlyForm.vue';
import BannerSlides from '../../english/content/BannerSlides.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import BannerText from '../../english/content/BannerText.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';
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
import { TrackingFeatureName } from '@src/tracking/TrackingEvent';

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
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
}

defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'maybeLater', 'bannerContentChanged' ] );

const isFundsModalVisible = ref<boolean>( false );
const contentState = ref<ContentStates>( ContentStates.Main );
const formModel = useFormModel();
const stepControllers = [
	createSubmittableMainDonationForm( formModel, FormStepNames.UpgradeToYearlyFormStep ),
	createSubmittableUpgradeToYearly( formModel, FormStepNames.CustomAmountFormStep, FormStepNames.MainDonationFormStep ),
	createSubmittableCustomAmount( formModel, FormStepNames.UpgradeToYearlyFormStep )
];

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

function onCloseMain(): void {
	contentState.value = ContentStates.SoftClosing;
}

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
}

</script>
