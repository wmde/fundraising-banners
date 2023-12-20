<template>
	<div class="wmde-banner-double-progress" :style="{
		'--wmde-banner-progress-bar-width': progressBarContent.percentageTowardsTarget + '%',
		'--wmde-banner-progress-bar-time-width': currentCampaignTimePercentage + '%'
	}">
		<div class="wmde-banner-double-progress-amount">
			<div class="wmde-banner-double-progress-amount-fill">
				<div>{{ progressBarContent.amountNeeded }}</div>
				<div>{{ progressBarContent.amountDonated }}</div>
			</div>
			<div class="wmde-banner-double-progress-amount-difference">!</div>
		</div>
		<div class="wmde-banner-double-progress-time">
			<div class="wmde-banner-double-progress-time-fill">
				<div>{{ $translate( 'double-progress-close' ) }}</div>
				<div>{{ daysLeftSentence }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { progressBarContent, daysLeftSentence } = inject<DynamicContent>( 'dynamicCampaignText' );
const currentCampaignTimePercentage = inject<number>( 'currentCampaignTimePercentage' );

</script>
