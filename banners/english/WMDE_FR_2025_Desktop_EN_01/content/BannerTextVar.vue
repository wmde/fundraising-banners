<template>
	<div class="wmde-banner-message">
		<div>
			<p class="headline">
				<InfoIcon fill="#990a00"/>
				{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - “Wikipedia still can't be sold.”
				- An important update for readers in Germany.
			</p>
			<p>
				Please don't skip this 1-minute read. It's {{ liveDateAndTime.currentDate }}, and we're running a short
				fundraiser to support Wikipedia. If you've lost count of how many times you've visited Wikipedia this
				year, we hope that means it's given you at least €5 of knowledge. <AnimatedText content="Please join
				the 1% of readers who give what they can to keep this valuable resource ad-free and available for all."/>
			</p>
			<p>
				25 years ago Wikipedia was a dream. A wildly ambitious, probably impossible dream. A dream that came
				together piece by piece. Now, 65 million articles. 260,000 volunteers across the entire world. Here's
				to 25 years of knowledge, humanity, and collaboration at its best.
			</p>
			<p>
				Most readers donate because Wikipedia is useful to them, others because they realize knowledge needs
				humans. If you feel the same, please donate €5 now—or consider a yearly gift to help all year. Thank you.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIconStraight.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

const { getCurrentDateAndTime }: DynamicContent = inject( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
