<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<BannerMain
			@close="onCloseMain"
			v-if="contentState === ContentStates.Main"
			:bannerState="bannerState"
		>
			<template #banner-slides="{ play }: any">
				<BannerSlides :play="play"/>
			</template>

			<template #progress>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</template>

			<template #donation-form="{ formInteraction }: any">
				<MultiStepDonation :form-controller="formController" @form-interaction="formInteraction">

					<template #form-page-1="{ pageIndex, submit, next, previous }: any">
						<MainDonationForm :page-index="pageIndex" @submit="submit" @next="next" @previous="previous"/>
					</template>

					<template #form-page-2="{ pageIndex, submit, next, previous }: any">
						<UpgradeToYearlyForm :page-index="pageIndex" @submit="submit" @next="next" @previous="previous"/>
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
			@close="() => onClose( CloseSources.SoftCloseBannerRejected )"
			@maybe-later="() => onClose( CloseSources.MaybeLater )"
			@time-out-close="() => onClose( CloseSources.TimeOut )"
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
			@goAway="() => onClose( CloseSources.AlreadyDonatedGoAway )"
			@maybe-later="() => onClose( CloseSources.MaybeLater )"
		>
			<template #already-donated-content>
				<AlreadyDonatedContent/>
			</template>
		</AlreadyDonatedModal>
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import { inject, nextTick, ref, watch } from 'vue';
import { FormController } from '@src/utils/FormController/FormController';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import BannerMain from './BannerMain.vue';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import BannerSlides from '../content/BannerSlides.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import UpgradeToYearlyForm from '@src/components/DonationForm/Forms/UpgradeToYearlyForm.vue';
import AlreadyDonatedModal from '@src/components/AlreadyDonatedModal/AlreadyDonatedModal.vue';
import AlreadyDonatedContent from '../../english/content/AlreadyDonatedContent.vue';
import FooterAlreadyDonated from '@src/components/Footer/FooterAlreadyDonated.vue';
import { Tracker } from '@src/tracking/Tracker';
import { ClickAlreadyDonatedEvent } from '@src/tracking/events/ClickAlreadyDonatedEvent';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

interface Props {
	bannerState: BannerStates;
	formController: FormController;
	useOfFundsContent: useOfFundsContentInterface;
}

defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const tracker = inject<Tracker>( 'tracker' );

const isFundsModalVisible = ref<boolean>( false );
const isAlreadyDonatedModalVisible = ref<boolean>( false );
const contentState = ref<ContentStates>( ContentStates.Main );

watch( contentState, async () => {
	// Wait a tick in order to let the content re-render before notifying the parent
	await nextTick();
	emit( 'bannerContentChanged' );
} );

function onCloseMain(): void {
	contentState.value = ContentStates.SoftClosing;
}

function onClose( closeSource: CloseSources ): void {
	emit( 'bannerClosed', closeSource );
}

function onShowAlreadyDonatedModal(): void {
	isAlreadyDonatedModalVisible.value = true;
	tracker.trackEvent( new ClickAlreadyDonatedEvent() );
}

</script>
