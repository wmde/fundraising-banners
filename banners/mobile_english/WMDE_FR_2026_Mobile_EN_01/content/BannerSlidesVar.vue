<template>

	<KeenSliderSlide :current-slide="currentSlide" :index="0" class="wmde-c-flow wmde-b-prose" data-align="centered">
		<p><strong>Our donation target: €{{ goalDonationSum }} million</strong></p>
		<slot name="progress"/>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="1" class="wmde-b-prose" data-align="centered">
		<p><strong>Hi,</strong></p>
		<p>
			we may be coming at an inopportune moment, but please don't click away! On this {{ currentDayName }}, at
			{{ liveDateAndTime.currentDate }}, we're asking you to support Wikipedia's independence.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="2" class="wmde-b-prose" data-align="centered">
		<p>
			{{ campaignDaySentence }}
			<AnimatedText :is-visible="currentSlide === 2">{{ visitorsVsDonorsSentence }}</AnimatedText>
			Most people donate because they find Wikipedia useful.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="3" class="wmde-b-prose" data-align="centered">
		<p>
			The average donation is {{ averageDonation }}, but even €5 helps us.
			Has Wikipedia given you the value of a cup of coffee this year?
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="4" class="wmde-b-prose" data-align="centered">
		<p>
			Then choose to be one of the rare exceptions and give something back.
			<strong> Thank you!</strong>
		</p>
	</KeenSliderSlide>

</template>

<script setup lang="ts">
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted, watch } from 'vue';
import KeenSliderSlide from '@src/components/Slider2026/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText2026/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

interface Props {
	playLiveText: boolean;
	currentSlide: number
}

const props = defineProps<Props>();

const {
	currentDayName,
	goalDonationSum,
	averageDonation,
	visitorsVsDonorsSentence,
	getCurrentDateAndTime,
	campaignDaySentence,
}: DynamicContent = inject( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( !shouldPlay ) {
		stopTimer();
	}
} );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
