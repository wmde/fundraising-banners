<template>
	<div class="wmde-banner-message">
		<div>
			<p class="headline">
				<InfoIcon fill="#990a00"/>
				{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }}: &#8220;Wikipedia still
				can't be sold.&#8221; - An important update for readers in Germany.
			</p>
			<p>
				Please don't skip this 1-minute read. It's {{ currentDayName }} and if you're like us, you've used
				Wikipedia countless times. To settle an argument with a friend. To satisfy a curiosity. Whether it's 3
				in the morning or the afternoon, Wikipedia is useful in your life.
			</p>
			<p>
				We do not run ads – we rely on the support of everyday readers. {{ campaignDaySentence }}
				<AnimatedText :content="visitorsVsDonorsSentence"/> But that small group makes a big difference.
			</p>
			<p>
				When you support Wikipedia, you're standing up for something simple but profound: that knowledge should
				belong to everyone. If you agree, then this is your moment to give back. Even €5 or the price of a cup
				of coffee make a difference. Help keep it going – for you, the next reader, and the next generation.
				Thank you.
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

const {
	currentDayName,
	getCurrentDateAndTime,
	visitorsVsDonorsSentence,
	campaignDaySentence
}: DynamicContent = inject( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
