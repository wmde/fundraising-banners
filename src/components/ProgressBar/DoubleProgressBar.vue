<template>
	<div class="wmde-banner-double-progress" :class="{ 'is-late-progress' : progressBarContent.isLateProgress }" :style="{
		'--wmde-banner-progress-bar-width': progressBarContent.percentageTowardsTarget + '%',
		'--wmde-banner-progress-bar-time-width': currentCampaignTimePercentage + '%'
	}">
		<div class="wmde-banner-double-progress-amount">
			<div class="wmde-banner-double-progress-amount-fill">
				<div v-if="progressBarContent.isLateProgress" class="amount-needed text-fade">{{ progressBarContent.amountNeeded }}</div>
				<div class="text-fade">{{ progressBarContent.amountDonated }}</div>
			</div>
			<div class="wmde-banner-double-progress-amount-difference">!</div>
			<div class="wmde-banner-double-progress-right-text text-fade" v-if="!progressBarContent.isLateProgress">{{ progressBarContent.amountNeeded }}</div>
		</div>
		<div class="wmde-banner-double-progress-time">
			<div class="wmde-banner-double-progress-time-fill">
				<template v-if="progressBarContent.isLateProgress">
					<div class="close-text text-fade">{{ $translate( 'double-progress-close' ) }}</div>
					<div class="days-left text-fade">{{ daysLeftSentence }}</div>
				</template>
				<template v-else>
					<div class="text-fade">{{ daysPassedSentence }}</div>
				</template>
			</div>
			<div class="wmde-banner-double-progress-right-text text-fade" v-if="!progressBarContent.isLateProgress">{{ daysLeftSentence }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { progressBarContent, daysLeftSentence, daysPassedSentence } = inject<DynamicContent>( 'dynamicCampaignText' );
const currentCampaignTimePercentage = inject<number>( 'currentCampaignTimePercentage' );

</script>
