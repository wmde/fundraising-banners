<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p class="headline">
			<strong>
				<InfoIcon fill="#990a00"/>
				{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }}: &#8220;Wikipedia is not for
				sale.&#8221; - A personal appeal from Wikipedia founder Jimmy Wales.
			</strong>
		</p>
		<p>
			Please don't ignore this 1-minute read. This {{ currentDayName }}, {{ currentDate }}, I ask you to reflect
			on the number of times you visited Wikipedia in the past year, the value you got from it, and whether you're
			able to give €5 back.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			If you can, please join the 1% of readers who give.
			<AnimatedText content="If everyone reading this right now gave just €5, we'd hit our goal in a couple of hours."/>
			It's hard to know what to trust online these days. Disinformation and scammers are everywhere.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Wikipedia is different. It's not perfect, but it's not here to make a profit or to push a particular perspective.
			It's written by everyone, together. Wikipedia is something we all share, like a library or a public park.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			We are passionate about our model because we want everyone to have equal access to quality information
			- something that is becoming harder and harder to find online. If Wikipedia has given you €5 worth of
			knowledge this year, please give back. There are no small contributions: every edit counts, every donation
			counts. <em>Thank you.</em>
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted } from 'vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const { currentDayName, currentDate, getCurrentDateAndTime }: DynamicContent = inject( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
