<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				<strong>
					<InfoIcon fill="#990a00"/>
					{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }}: &#8220;Wikipedia still
					can't be sold.&#8221; - An important update for readers in Germany.
				</strong>
			</p>
			<p>
				Today is the day. We're sorry to interrupt, but it's {{ currentDayName }}, {{ currentDate }}, and this
				message will be up for only a few hours.
				We ask you to reflect on the number of times you visited
				Wikipedia in the past year and if you're able to give €5 back.
				<AnimatedText content="If everyone reading this gave just €5, we'd hit our goal in a few hours."/>
			</p>
			<p>
				In the age of AI, access to verifiable facts is crucial. Wikipedia is at the heart of online
				information, powering everything from your personal searches to emerging AI technologies. Your gift
				strengthens the knowledge of today and tomorrow.
			</p>
			<p>
				Just 1% of our readers donate, so if you have
				given in the past and Wikipedia still provides you with €5 worth of knowledge, kindly donate today. If
				you are undecided, remember that any contribution helps, whether it's €5 or €25. Thank you.
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

const { currentDayName, currentDate, getCurrentDateAndTime }: DynamicContent = inject( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
