<template>
	<div class="wmde-fbb-message">
		<div class="wmde-fbb-message-content">
			<p>
				<InfoIcon fill="#990a00"/> <strong>Please don't ignore this 1-minute read</strong>
			</p>
			<p>
				This {{ currentDayName }}, {{ liveDateAndTime.currentDate }} at {{ liveDateAndTime.currentTime }}, please
				reflect on the number of times you visited
				Wikipedia in the past year, the value you got from it, and whether you're able to give €5 back. If you
				can, please join the 1% of readers who give. <em>Thank you.</em>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIconStraight.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

const {
	currentDayName,
	getCurrentDateAndTime
}: DynamicContent = inject( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
