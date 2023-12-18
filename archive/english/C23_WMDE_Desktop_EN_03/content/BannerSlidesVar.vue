<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p class="headline">
			<InfoIcon fill="#990a00"/>
			<strong> &#8220;Wikipedia is still not on the market.&#8221; - A personal appeal from Wikipedia founder Jimmy Wales.</strong>
		</p>
		<p>
			Please don't ignore this 1-minute read. This {{ currentDayName }}, {{ currentDate }}, I ask you to reflect
			on the number of times you visited Wikipedia in the past year, the value you got from it, and whether you're able to give €5 back.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			If you can, please join the 1% of readers who give.
			<AnimatedText content="If everyone reading this right now gave just €5, we'd hit our goal in a couple of hours."/>
			Wikipedia is not perfect, but also not here to make a profit or to push a particular perspective. It is written by everyone, together.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			We want everyone to have equal access to high-quality information – something that is hard to find online.
			If Wikipedia has given you €5 worth of knowledge this year, please give back. There are no small contributions:
			every edit counts, every donation counts. <em>Thank you.</em>
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const { currentDayName, currentDate }: DynamicContent = inject( 'dynamicCampaignText' );
</script>
