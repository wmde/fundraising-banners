<template>
	<KeenSliderSlide :is-current="currentSlide === 0" class="wmde-banner-slide-content-with-progress-bar">
		<p><strong>Wikipedia is not for sale</strong></p>
		<ProgressBar amount-to-show-on-right="MISSING"/>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			We may be coming at an inopportune moment, but please don't click away!
		</p>
		<p>
			On this {{ currentDayName }}, at {{ currentDate }}, we're asking you to support Wikipedia's independence.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			{{ campaignDaySentence }} <AnimatedText :content="visitorsVsDonorsSentence"/>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Most people donate because they find Wikipedia useful. The average donation is {{ averageDonation }}, but even €5 helps us.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>
			Has Wikipedia given you the value of a cup of coffee this year? Then choose to be one of the rare exceptions
			and give something back. Thank you!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, watch } from 'vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

interface Props {
	playLiveText: boolean;
	currentSlide: number
}

const props = defineProps<Props>();

const {
	currentDayName,
	getCurrentDateAndTime,
	campaignDaySentence,
	visitorsVsDonorsSentence,
	currentDate,
	averageDonation
}: DynamicContent = inject( 'dynamicCampaignText' );

const { startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( !shouldPlay ) {
		stopTimer();
	}
} );

onMounted( startTimer );
</script>
