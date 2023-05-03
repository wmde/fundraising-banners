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

					<template #left-icon>
						<ChevronLeftIcon/>
					</template>

					<template #right-icon>
						<ChevronRightIcon/>
					</template>

				</KeenSlider>
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

					<template #form-page-3="{ pageIndex, submit, next, previous }: any">
						<CustomAmountForm :page-index="pageIndex" @submit="submit" @next="next" @previous="previous"/>
					</template>

					<template #form-page-4="{ pageIndex, submit, next, previous }: any">
						<AddressTypeForm :page-index="pageIndex" @submit="submit" @next="next" @previous="previous"/>
					</template>

				</MultiStepDonation>
			</template>

			<template #footer>
				<BannerFooter @showFundsModal="isFundsModalVisible = true" />
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
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import { ref, watch } from 'vue';
import { FormController } from '@src/utils/FormController/FormController';
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
import AddressTypeForm from '@src/components/DonationForm/Forms/AddressTypeForm.vue';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@src/components/Icons/ChevronRightIcon.vue';

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

const isFundsModalVisible = ref<boolean>( false );
const contentState = ref<ContentStates>( ContentStates.Main );

watch( contentState, async () => {
	emit( 'bannerContentChanged' );
} );

function onCloseMain(): void {
	contentState.value = ContentStates.SoftClosing;
}

function onClose( closeSource: CloseSources ): void {
	emit( 'bannerClosed', closeSource );
}

</script>
