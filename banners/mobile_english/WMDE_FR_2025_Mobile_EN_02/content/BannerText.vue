<template>
	<div class="wmde-banner-message">
		<div>
			<p class="banner-text-title">
				Wikipedia is not for sale
			</p>
			<p>
				We may be coming at an inopportune moment, but please don't click away! On this {{ currentDayName }}, at
				{{ currentDate }}, we're asking you to support Wikipedia's independence. {{ campaignDaySentence }}
				<AnimatedText :content="visitorsVsDonorsSentence"/> Most people donate because they find Wikipedia
				useful. The average donation is {{ averageDonation }}, but even €5 helps us. Has Wikipedia given you the value of a cup
				of coffee this year? Then choose to be one of the rare exceptions and give something back. Thank you!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

interface Props {
	playLiveText: boolean
}

const props = defineProps<Props>();

const {
	currentDayName,
	getCurrentDateAndTime,
	visitorsVsDonorsSentence,
	campaignDaySentence,
	currentDate,
	averageDonation
}: DynamicContent = inject( 'dynamicCampaignText' );

const { startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( shouldPlay ) {
		startTimer();
	} else {
		stopTimer();
	}
} );

</script>
