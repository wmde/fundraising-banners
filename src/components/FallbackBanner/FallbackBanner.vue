<template>
	<div class="wmde-fbb">
		<ButtonClose @close="$emit( 'bannerClosed' )"/>

		<div class="wmde-fbb-small" v-if="!onLargeScreen">
			<KeenSlider
				:with-pagination="false"
				:play="slideshowShouldPlay"
				:interval="10000"
				:delay="2000"
				@slideChanged="onSlideChange"
			>
				<template #slides="{ currentSlide }: any">
					<slot name="slides" :currentSlide="currentSlide"/>
				</template>

				<template #left-icon>
					<ChevronLeftIcon :fill="'#990a00'"/>
				</template>

				<template #right-icon>
					<ChevronRightIcon :fill="'#990a00'"/>
				</template>
			</KeenSlider>

			<FallbackButton @buttonClicked="onSubmit"/>
			<SmallFooter @useOfFundsButtonClicked="isFundsModalVisible = true"/>
		</div>

		<div class="wmde-fbb-large" v-if="onLargeScreen">
			<slot name="message"/>
			<LargeFooter @useOfFundsButtonClicked="isFundsModalVisible = true" @submitButtonClicked="onSubmit"/>
		</div>

		<FundsModal
			:content="useOfFundsContent"
			:visible="isFundsModalVisible"
			@hide="isFundsModalVisible = false"
			@call-to-action="isFundsModalVisible = false"
		/>

	</div>
</template>

<script setup lang="ts">

import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { UseOfFundsContent as useOfFundsContentInterface } from '@src/domain/UseOfFunds/UseOfFundsContent';
import { computed, inject, ref } from 'vue';
import { useDisplaySwitch } from '@src/components/composables/useDisplaySwitch';
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import ChevronLeftIcon from '@src/components/Icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '@src/components/Icons/ChevronRightIcon.vue';
import FundsModal from '@src/components/UseOfFunds/UseOfFundsModal.vue';
import FallbackButton from '@src/components/FallbackBanner/FallbackButton.vue';
import SmallFooter from '@src/components/FallbackBanner/SmallFooter.vue';
import LargeFooter from '@src/components/FallbackBanner/LargeFooter.vue';
import { Tracker } from '@src/tracking/Tracker';
import { FallbackBannerSubmitEvent } from '@src/tracking/events/FallbackBannerSubmitEvent';

interface Props {
	bannerState: BannerStates;
	useOfFundsContent: useOfFundsContentInterface;
	donationLink: string;
}

const props = defineProps<Props>();
defineEmits( [ 'bannerClosed' ] );

const tracker = inject<Tracker>( 'tracker' );
const slideIndex = ref<number>( 0 );
const slideCount = ref<number>( 0 );
const slideShowStopped = ref<boolean>( false );
const slideshowShouldPlay = computed( () => props.bannerState === BannerStates.Visible && !slideShowStopped.value );
const isFundsModalVisible = ref<boolean>( false );

const onLargeScreen = useDisplaySwitch( 799 );

function onSlideChange( newIndex: number, newSlideCount: number ): void {
	slideIndex.value = newIndex;
	slideCount.value = newSlideCount;
}

function onSubmit(): void {
	tracker.trackEvent( new FallbackBannerSubmitEvent() );
	window.location.href = props.donationLink;
}
</script>
