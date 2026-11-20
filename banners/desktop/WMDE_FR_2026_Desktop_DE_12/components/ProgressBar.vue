<template>
	<Progress :progress-percentage="progressBarContent.percentageTowardsTarget" :drama-percentage="dailyAmounts.progressPercentage" :is-visible="isVisible">
		<template #fill-text>{{ $translate( 'progress-today' ) }} {{ progressBarContent.amountDonated }}</template>
		<template #target-text>{{ progressBarContent.donationTargetAmount }}</template>
		<template #drama-text>{{ $translate( 'progress-drama' ) }} <span class="wmde-u-highlighted-text" data-error>{{ dailyAmounts.formattedCurrent }}</span></template>
		<template #screen-reader-text>{{ $translate( 'progress-bar-screen-reader-text', { current: progressBarContent.amountDonated, target: progressBarContent.donationTargetAmount } ) }}</template>
	</Progress>
</template>

<script setup lang="ts">
import Progress from '@src/components/ProgressBar2026/DramaProgressBar.vue';
import { inject } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { DailyAmounts } from './../DailyAmounts2025';

interface Props {
	isVisible: boolean;
	dailyAmounts: DailyAmounts;
}

defineProps<Props>();

const { progressBarContent } = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
