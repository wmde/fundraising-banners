<template>
	<div class="wmde-fbb-progress-bar" :class="{
		'wmde-fbb-progress-bar--late-progress': progressBarContent.isLateProgress
	}" :style="{ '--wmde-banner-progress-bar-width': progressBarContent.percentageTowardsTarget + '%' }">
		<div class="wmde-fbb-progress-bar-text">
			<div class="wmde-fbb-progress-bar-text-left">
				<template v-if="progressBarContent.isLateProgress">
					{{ daysLeftSentence }}
				</template>
			</div>
			<div class="wmde-fbb-progress-bar-text-right">
				<template v-if="!progressBarContent.isLateProgress">
					{{ progressBarContent.donationTarget }}
				</template>
			</div>
		</div>
		<div class="wmde-fbb-progress-bar-fill-wrapper">
			<div class="wmde-fbb-progress-bar-fill">
				<span class="wmde-fbb-progress-bar-fill-text">
					{{ progressBarContent.amountDonated }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';

const { daysLeftSentence, progressBarContent } = inject<DynamicContent>( 'dynamicCampaignText' );
</script>
