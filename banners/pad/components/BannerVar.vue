<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<BannerMain
			@close="onCloseMain"
			@form-interaction="onFormInteraction"
			v-if="contentState === ContentStates.Main"
			:bannerState="bannerState"
		>
			<template #banner-slides="{ play }: any">
				<div class="wmde-banner-content-headline">
					<span class="wmde-banner-content-headline-text">Ist Ihnen Wikipedia 5&nbsp;€ wert?</span>
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
						<MainDonationForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous"/>
					</template>

					<template #[FormStepNames.UpgradeToYearlyFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<UpgradeToYearlyButtonForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous">
							<template #back>
								<ChevronLeftIcon/>
							</template>
						</UpgradeToYearlyButtonForm>
					</template>

				</MultiStepDonation>
			</template>

			<template #footer>
				<FooterAlreadyDonated
					@showFundsModal="isFundsModalVisible = true"
					@showAlreadyDonatedModal="onShowAlreadyDonatedModal"
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

		<AlreadyDonatedModal
			:is-visible="isAlreadyDonatedModalVisible"
			:is-already-donated-modal-visible="isAlreadyDonatedModalVisible"
			@hideAlreadyDonatedModal="isAlreadyDonatedModalVisible = false"
			@goAway="() => onClose( 'AlreadyDonatedModal', CloseChoices.NoMoreBannersForCampaign )"
			@maybe-later="() => onClose( 'AlreadyDonatedModal', CloseChoices.MaybeLater )"
		>
			<template #already-donated-content>
				<AlreadyDonatedContent/>
			</template>
		</AlreadyDonatedModal>
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { nextTick, ref, watch } from 'vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import BannerMain from './BannerMain.vue';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import BannerSlides from '../content/BannerSlidesVar.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import AlreadyDonatedModal from '@src/components/AlreadyDonatedModal/AlreadyDonatedModal.vue';
import AlreadyDonatedContent from '../../english/content/AlreadyDonatedContent.vue';
import FooterAlreadyDonated from '@src/components/Footer/FooterAlreadyDonated.vue';
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
}

defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const isFundsModalVisible = ref<boolean>( false );
const isAlreadyDonatedModalVisible = ref<boolean>( false );
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

function onCloseMain(): void {
	contentState.value = ContentStates.SoftClosing;
}

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
}

function onShowAlreadyDonatedModal(): void {
	isAlreadyDonatedModalVisible.value = true;
}

</script>
