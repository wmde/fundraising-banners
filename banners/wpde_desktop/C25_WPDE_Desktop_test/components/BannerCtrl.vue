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
			<template #donation-form="{ formInteraction }: any">
				<MultiStepDonation :step-controllers="stepControllers" @form-interaction="formInteraction">
				</MultiStepDonation>
			</template>

			<template #footer>
				<FooterAlreadyDonated
					@showFundsModal="isFundsModalVisible = true"
					@clickedAlreadyDonatedLink="onClose( 'AlreadyDonated', CloseChoices.AlreadyDonated )"
				/>
			</template>

		</MainBanner>

		<button @click="setTestCookie"> Keks setzen </button>

		<SoftClose
			v-if="contentState === ContentStates.SoftClosing"
			@close="() => onClose( 'SoftClose', CloseChoices.Close )"
			@maybe-later="() => onClose( 'SoftClose', CloseChoices.MaybeLater )"
			@time-out-close="() => onClose( 'SoftClose', CloseChoices.TimeOut )"
		/>
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { ref, watch } from 'vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import MainBanner from './MainBanner.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
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
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import SetCookieImage from '@src/components/SetWPDECookieImage/SetCookieImage.vue';
import FooterAlreadyDonated from '@src/components/Footer/FooterAlreadyDonated.vue';
import SetAlreadyDonatedCookieImage from '@src/components/SetWPDECookieImage/SetAlreadyDonatedCookieImage.vue';
import SetMaybeLaterCookieImage from '@src/components/SetWPDECookieImage/SetMaybeLaterCookieImage.vue';

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
	remainingImpressions: number;
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

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
	if ( props.remainingImpressions > 0 ) {
		contentState.value = ContentStates.SoftClosing;
	} else {
		onClose( 'MainBanner', CloseChoices.Close );
	}
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

function setTestCookie(): void {

	const cookieName = 'wmde-banner-test';
	const cookieValue = 'test';
	const myDate = new Date();

	// expiry date: 1 week later
	myDate.setDate( myDate.getDate() + 7 );

	const domain = 'wikipedia.de';

	document.cookie =
		cookieName + '=' + cookieValue +
		';expires=' + myDate +
		';domain='+ domain +
		';path=/';
}

</script>
