<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				<strong>
					<InfoIcon fill="#990a00"/>
					{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }}: “The internet we were
					promised“ - An important update for readers in Germany.
				</strong>
			</p>
			<p>
				You deserve an explanation, so please don't skip this 1-minute read. It's {{ currentDayName }},
				{{ currentDate }}, and this message will be up only briefly. Please reflect on how often you've visited
				Wikipedia this year and if you're able to give €5 back.
				<AnimatedText content="If everyone reading this gave €5, we'd hit our goal in a few hours."/>
			</p>
			<p>
				The internet we were promised—a place of free, collaborative, and accessible knowledge—is under
				constant threat. On Wikipedia, volunteers work together to create and verify the pages you rely on,
				supported by tools that undo vandalism within minutes, ensuring the information you seek is trustworthy.
			</p>
			<p>
				Just 1% of our readers donate, so if you have given in the past and Wikipedia still provides you with
				€5 worth of knowledge, donate today. If you are undecided, remember any contribution helps, whether
				it's €5 or €25. Thank you.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';

const { currentDayName, currentDate, getCurrentDateAndTime }: DynamicContent = inject( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
