<template>
	<Progress :progress-percentage="progressBarContent.percentageTowardsTarget" :is-visible="isVisible">
		<template #fill-text>{{ progressBarContent.amountDonated }}</template>
		<template #target-text>{{ progressBarContent.donationTargetAmount }}</template>
		<template #screen-reader-text>{{ $translate( 'progress-bar-screen-reader-text', { current: progressBarContent.amountDonated, target: progressBarContent.donationTargetAmount } ) }}</template>
	</Progress>
</template>

<script setup lang="ts">
import Progress from '@src/components/ProgressBar2026/ProgressBar.vue';
import { inject } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

interface Props {
	isVisible: boolean;
}

defineProps<Props>();

const { progressBarContent } = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
