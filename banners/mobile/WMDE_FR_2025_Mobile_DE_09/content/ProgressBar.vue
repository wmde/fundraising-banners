<template>
	<ProgressBar :with-extra-labels="true">
		<template #extra-label-right>
			{{ progressBarContent.donationTarget }}
		</template>
		<template #amount-fill-left>
			<HandIcon/>
		</template>
		<template #amount-fill-right>
			{{ progressBarContent ? progressBarContent.amountNeeded : progressBarContent.amountDonated }}
		</template>
		<template #time-fill-left>
			<TimerIcon/>
		</template>
		<template #time-fill-right>
			{{ daysLeftSentence }}
		</template>
	</ProgressBar>
</template>

<script setup lang="ts">
import HandIcon from '@src/components/ProgressBar/Icons/HandIcon.vue';
import ProgressBar from '@src/components/ProgressBar/ConfigurableDoubleProgressBar.vue';
import TimerIcon from '@src/components/ProgressBar/Icons/TimerIcon.vue';
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { progressBarContent, daysLeftSentence } = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
