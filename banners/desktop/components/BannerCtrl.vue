<template>
	<div class="wmde-banner-wrapper" :class="contentState" :style="colors">
		<MainBanner
			@form-interaction="$emit( 'bannerContentChanged' )"
			v-if="contentState === ContentStates.Main"
			:bannerState="bannerState"
		>
			<template #close-button>
				<div class="wmde-banner-minimised-button-group">
					<button class="wmde-banner-minimised-minimise" @click.prevent="onMinimiseBanner">Banner ausklappen <ChevronDownIcon/></button>
					<ButtonClose @close="() => onCloseMain( 'MainBanner', CloseChoices.Close )"/>
				</div>
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

			<template #progress>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</template>

			<template #donation-form="{ formInteraction }: any">
				<MultiStepDonation :step-controllers="stepControllers" @form-interaction="formInteraction">

					<template #[FormStepNames.MainDonationFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<MainDonationForm :page-index="pageIndex" @submit="submit" :is-current="isCurrent" @previous="previous"/>
					</template>

					<template #[FormStepNames.UpgradeToYearlyFormStep]="{ pageIndex, submit, isCurrent, previous }: any">
						<UpgradeToYearlyButtonForm :page-index="pageIndex" :show-manual-upgrade-option="false" @submit="submit" :is-current="isCurrent" @previous="previous"/>
					</template>

				</MultiStepDonation>
			</template>

			<template #footer>
				<FooterAlreadyDonated
					@showFundsModal="isFundsModalVisible = true"
					@showAlreadyDonatedModal="isAlreadyDonatedModalVisible = true"
				/>
			</template>

		</MainBanner>

		<MinimisedBanner
			v-if="contentState === ContentStates.Minimised"
			@maximise="onMaximiseBanner"
			@close="() => onCloseMain( 'MinimisedBanner', CloseChoices.Close )"
		>
			<template #footer>
				<BannerFooter @showFundsModal="isFundsModalVisible = true"/>
			</template>
		</MinimisedBanner>

		<SoftClose
			v-if="contentState === ContentStates.SoftClosing"
			:show-close-icon="true"
			@close="() => onClose( 'SoftClose', CloseChoices.Close )"
			@maybeLater="() => onClose( 'SoftClose', CloseChoices.MaybeLater )"
			@timeOutClose="() => onClose( 'SoftClose', CloseChoices.TimeOut )"
			@maybeLater7Days="() => onClose('SoftClose', CloseChoices.Close)"
		/>

		<FundsModal
			:content="useOfFundsContent"
			:is-funds-modal-visible="isFundsModalVisible"
			@hideFundsModal="isFundsModalVisible = false"
		/>

		<AlreadyDonatedModal
			:is-visible="isAlreadyDonatedModalVisible"
			@hideAlreadyDonatedModal="isAlreadyDonatedModalVisible = false"
			@goAway="() => onClose( 'AlreadyDonatedModal', CloseChoices.NoMoreBannersForCampaign )"
			@maybeLater="() => onClose( 'AlreadyDonatedModal', CloseChoices.Close )"
		>
			<template #already-donated-content>
				<AlreadyDonatedContent/>
			</template>
		</AlreadyDonatedModal>
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { inject, ref, watch } from 'vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import MainBanner from './MainBanner.vue';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import BannerText from '../content/BannerText.vue';
import BannerSlides from '../content/BannerSlides.vue';
import AlreadyDonatedContent from '../content/AlreadyDonatedContent.vue';
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
import ProgressBar from '@src/components/ProgressBar/ProgressBarAlternative.vue';
import FooterAlreadyDonated from '@src/components/Footer/FooterAlreadyDonated.vue';
import AlreadyDonatedModal from '@src/components/AlreadyDonatedModal/AlreadyDonatedModal.vue';
import colors from '../styles/colors';
import MinimisedBanner from './MinimisedBanner.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';
import ChevronDownIcon from './ChevronDownIcon.vue';
import { Tracker } from '@src/tracking/Tracker';
import { BannerMinimisedEvent } from '../events/BannerMinimisedEvent';
import { BannerMaximisedEvent } from '../events/BannerMaximisedEvent';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main',
	Minimised = 'wmde-banner-wrapper--minimised',
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
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const tracker = inject<Tracker>( 'tracker' );
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

function onCloseMain( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	if ( props.remainingImpressions > 0 ) {
		contentState.value = ContentStates.SoftClosing;
	} else {
		onClose( feature, userChoice );
	}
}

function onClose( feature: TrackingFeatureName, userChoice: CloseChoices ): void {
	emit( 'bannerClosed', new CloseEvent( feature, userChoice ) );
}

function onMinimiseBanner(): void {
	contentState.value = ContentStates.Minimised;
	tracker.trackEvent( new BannerMinimisedEvent() );
}

function onMaximiseBanner(): void {
	contentState.value = ContentStates.Main;
	tracker.trackEvent( new BannerMaximisedEvent() );
}

</script>
