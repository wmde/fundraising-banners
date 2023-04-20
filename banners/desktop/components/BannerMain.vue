<template>
	<div class="wmde-banner-main">
		<ButtonClose @click.prevent="$emit( 'close' )"/>
		<div class="wmde-banner-content">
			<div class="wmde-banner-column-left">
				<BannerText v-if="onLargeScreen"/>
				<BannerSlides v-else :play="slideshowShouldPlay"/>
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</div>
			<div class="wmde-banner-column-right">
				<MultiStepDonation
					:form-controller="formController"
					:forms="forms"
					@form-interaction="onFormInteraction"
				/>
			</div>
		</div>
		<BannerFooter @showFundsModal="$emit( 'showFundsModal' )" />
	</div>
</template>

<script setup lang="ts">

import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import BannerText from '../content/BannerText.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import BannerFooter from '@src/components/Footer/BannerFooter.vue';
import { useDisplaySwitch } from '@src/components/composables/useDisplaySwitch';
import BannerSlides from '../content/BannerSlides.vue';
import MultiStepDonation from '@src/components/DonationForm/MultiStepDonation.vue';
import { FormController } from '@src/utils/FormController/FormController';
import { Component, computed, ref } from 'vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

interface Props {
	bannerState: BannerStates;
	formController: FormController;
	forms: Component[]
}

const props = defineProps<Props>();
defineEmits( [ 'showFundsModal', 'close' ] );

const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );

const onLargeScreen = useDisplaySwitch( 1300 );

const onFormInteraction = (): void => {
	slideShowStopped.value = true;
};

</script>

<style lang="scss">
@use 'src/themes/Treedip/variables/globals';
@use 'src/themes/Treedip/variables/colors';

.wmde-banner {
	&-content {
		display: flex;
		flex-direction: row;
		order: 1;
		padding: 12px 24px 0;
	}

	&-column-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex: 1 1 auto;
		margin-bottom: 0;
		overflow-y: hidden;
		margin-right: 30px;
		padding: 0 15px;
		border: 5px solid colors.$primary;
		border-radius: 9px;
	}

	&-column-right {
		order: 2;
		flex: 0 0 globals.$form-width;
		display: flex;
		flex-direction: column;
		width: globals.$form-width;
		min-height: 315px;
		padding: 10px 0;
	}
}
</style>
