<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p>
			We may be coming at an inopportune moment, but please don't click away! This
			{{ liveDateAndTime.currentDate }}, we're asking you to support Wikipedia's independence.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			<AnimatedText content="Millions of people use Wikipedia, but 99% don't donate—they simply look the other
			way."/> Most people donate because they find Wikipedia useful. The average donation is €22.89, but even €5
			helps us.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Has Wikipedia given you the value of a cup of coffee this year? Then choose to be one of the rare
			exceptions and give something back. Thank you!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const { getCurrentDateAndTime } = inject<DynamicContent>( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
