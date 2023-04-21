<template>
	<div class="wmde-banner-wrapper" :class="contentState">
		<BannerMain
			@close="onCloseMain"
            @showFundsModal="isFundsModalVisible = true"
			@showAlreadyDonatedModal="isAlreadyDonatedModalVisible = true"
			v-if="contentState === ContentStates.Main"
			:bannerIsVisible="bannerIsVisible"
			:form-controller="formController"
			:forms="forms"
		/>
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
				:content="alreadyDonatedContent"
                :is-already-donated-modal-visible="isAlreadyDonatedModalVisible"
                @hideAlreadyDonatedModal="isAlreadyDonatedModalVisible = false">
        </AlreadyDonatedModal>
	</div>
</template>

<script setup lang="ts">
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { CloseSources } from '@src/tracking/CloseSources';
import SoftClose from '@src/components/SoftClose/SoftClose.vue';
import { Component, computed, nextTick, ref, watch } from 'vue';
import BannerMain from './BannerMain.vue';
import { FormController } from '@src/utils/FormController/FormController';
import FundsModal from '@src/components/UseOfFunds/FundsModal.vue';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import AlreadyDonatedModal from '@src/components/AlreadyDonatedModal/AlreadyDonatedModal.vue';

enum ContentStates {
	Main = 'wmde-banner-wrapper--main',
	SoftClosing = 'wmde-banner-wrapper--soft-closing'
}

interface Props {
	bannerState: BannerStates;
	formController: FormController;
	useOfFundsContent: useOfFundsContentInterface;
	alreadyDonatedContent: Component;
	forms: Component[];
}

const props = defineProps<Props>();
const emit = defineEmits( [ 'bannerClosed', 'bannerContentChanged' ] );

const bannerIsVisible = computed( () => props.bannerState === BannerStates.Visible );
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

</script>

<style lang="scss">
@use 'src/themes/Treedip/variables/globals';
@use 'src/themes/Treedip/variables/fonts';
@use 'src/themes/Treedip/variables/colors';

.wmde-banner {
	&-wrapper {
		font-size: 14px;
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
