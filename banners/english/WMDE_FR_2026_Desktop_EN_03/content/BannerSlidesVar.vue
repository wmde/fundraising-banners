<template>
	<KeenSliderSlide :current-slide="currentSlide" :index="0" class="wmde-b-prose wmde-c-flow" data-align="centered">
		<h2 class="wmde-b-icon-text wmde-c-cluster"><InfoIconItalic/> The internet is changing.</h2>
		<p class="headline">
			<strong>{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }}: An important update for readers in Germany.</strong>
		</p>
		<p>
			Thank you for visiting Wikipedia this {{ currentDayName }}, {{ currentDate }}.
			This year, Wikipedia has seen fewer visitors and fewer new readers, so your visit today means a lot.
			We don't take your attention for granted, but today we're asking you to give €5 if you can.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="1" class="wmde-b-prose" data-align="centered">
		<p>
			Like public libraries, we exist to serve everyone, not profit from your attention.
			That's why we don't run ads or put knowledge behind a paywall.
			Wikipedia's here to satisfy your curiosity and give you the facts you need.
			Wikipedia is free to use, but not free to provide.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="2" class="wmde-b-prose" data-align="centered">
		<p>
			An unprecedented rise in hardware costs is making the essential equipment
			needed to keep Wikipedia available to everyone much more expensive.
			<AnimatedText :is-visible="currentSlide === 2">Your donation helps our nonprofit meet those costs while keeping Wikipedia free and independent.</AnimatedText>
			Please donate €5 today.
			Thank you.
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted } from 'vue';
import KeenSliderSlide from '@src/components/Slider2026/KeenSliderSlide.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import InfoIconItalic from '@src/components/Icons/InfoIconItalic.vue';
import AnimatedText from '@src/components/AnimatedText2026/AnimatedText.vue';

interface Props {
	currentSlide: number;
}

defineProps<Props>();

const { currentDayName, currentDate, getCurrentDateAndTime } = inject<DynamicContent>( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
