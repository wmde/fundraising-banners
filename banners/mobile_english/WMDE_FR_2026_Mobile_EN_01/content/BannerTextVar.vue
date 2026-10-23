<template>
	<div class="wmde-b-prose wmde-c-flow">
		<p>
			<strong>Hi,</strong>
		</p>
		<p>
			we may be coming at an inopportune moment, but please don't click away! On this {{ currentDayName }}, at
			{{ liveDateAndTime.currentDate }}, we're asking you to support Wikipedia's independence. {{ campaignDaySentence }}
			<AnimatedText :is-visible="isVisible">{{ visitorsVsDonorsSentence }}</AnimatedText>
			Most people donate because they find Wikipedia
			useful. The average donation is {{ averageDonation }}, but even €5 helps us. Has Wikipedia given you the value of a cup
			of coffee this year? Then choose to be one of the rare exceptions and give something back. <strong> Thank you!</strong>
		</p>
		<slot name="progress"/>
	</div>
</template>

<script setup lang="ts">
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted, watch } from 'vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import AnimatedText from '@src/components/AnimatedText2026/AnimatedText.vue';

interface Props {
	playLiveText: boolean;
	isVisible: boolean;
}

const props = defineProps<Props>();

const { currentDayName, getCurrentDateAndTime, averageDonation, visitorsVsDonorsSentence, campaignDaySentence }: DynamicContent = inject( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( !shouldPlay ) {
		stopTimer();
	}
} );

onMounted( startTimer );
onUnmounted( stopTimer );

</script>
