<template>
	<div class="wmde-banner-wrapper wmde-banner-wrapper--main">
		<BannerMain
			@close="onClose"
			:bannerState="bannerState"
		>
			<template #banner-text>
				<BannerText/>
			</template>

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

					<template #form-page-3="{ pageIndex, submit, next, previous }: any">
						<CustomAmountForm :page-index="pageIndex" @submit="submit" @next="next" @previous="previous"/>
					</template>

				</MultiStepDonation>
			</template>

			<template #footer>
				<BannerFooter @showFundsModal="isFundsModalVisible = true" />
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
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import { ref } from 'vue';
import { FormController } from '@src/utils/FormController/FormController';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
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

interface Props {
	bannerState: BannerStates;
	formController: FormController;
	useOfFundsContent: useOfFundsContentInterface;
}

defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed' ] );

const isFundsModalVisible = ref<boolean>( false );

function onClose(): void {
	emit( 'bannerClosed', CloseSources.MainBanner );
}

</script>

<style lang="scss">
@use 'src/themes/Treedip/variables/globals';
@use 'src/themes/Treedip/variables/fonts';
@use 'src/themes/Treedip/variables/colors';

.wmde-banner {
	&-wrapper {
		font-family: fonts.$ui;
		box-shadow: 0 3px 0.6em rgba( 60 60 60 / 40% );
		background-color: colors.$white;
	}

	&--closed {
		.wmde-banner-wrapper {
			display: none;
		}
	}
}

</style>