<template>
    <div class="wmde-banner-wrapper" :class="contentState" >
        <BannerMain
                @close="onClose"
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

                    <template #form-page-3="{ pageIndex, submit, next, previous }: any">
                        <CustomAmountForm :page-index="pageIndex" @submit="submit" @next="next" @previous="previous"/>
                    </template>

                </MultiStepDonation>
            </template>

            <template #footer>
                <BannerFooter
                        @showFundsModal="isFundsModalVisible = true"
                />
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
import BannerSlides from '../../wpde_desktop/content/BannerSlides.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import MainDonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import UpgradeToYearlyForm from '@src/components/DonationForm/Forms/UpgradeToYearlyForm.vue';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { FormController } from '@src/utils/FormController/FormController';
import { ref } from 'vue';
import { CloseSources } from '@src/tracking/CloseSources';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import CustomAmountForm from '@src/components/DonationForm/Forms/CustomAmountForm.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';

enum ContentStates {
    Main = 'wmde-banner-wrapper--main'
}

interface Props {
    bannerState: BannerStates;
    formController: FormController;
    useOfFundsContent: useOfFundsContentInterface;
}
defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed' ] );

const contentState = ref<ContentStates>( ContentStates.Main );
const isFundsModalVisible = ref<boolean>( false );

function onClose(): void {
	emit( 'bannerClosed', CloseSources.MainBanner );
}
</script>
