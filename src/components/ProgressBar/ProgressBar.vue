<template>
	<div class="wmde-banner-progress-bar" :class="{
		'wmde-banner-progress-bar--late-progress': isLateProgress
	}" :style="{ '--wmde-banner-progress-bar-width': progressBarContent.percentageTowardsTarget + '%' }">
		<div class="wmde-banner-progress-bar-text">
			<div class="wmde-banner-progress-bar-text-left">
				{{ leftText }}
			</div>
			<div class="wmde-banner-progress-bar-text-right">
				{{ rightText }}
			</div>
		</div>
		<div class="wmde-banner-progress-bar-fill-wrapper">
			<div class="wmde-banner-progress-bar-fill">
			<span class="wmde-banner-progress-bar-fill-text">
					{{ progressBarContent.amountDonated }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';

interface Props {
	isLateProgress?: boolean;
	amountToShowOnRight: 'TARGET'|'MISSING'
}

const props = withDefaults( defineProps<Props>(), {
	isLateProgress: false
} );

const { daysLeftSentence, progressBarContent }: DynamicContent = inject( 'dynamicCampaignText' );

const leftText = props.isLateProgress ? daysLeftSentence : progressBarContent.amountDonated;
const rightText = props.amountToShowOnRight === 'TARGET' ? progressBarContent.donationTarget : progressBarContent.amountNeeded;
</script>
