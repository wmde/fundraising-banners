<template>
	<Progress :progress-percentage="currentCampaignTimePercentage" :is-visible="isVisible" kind="time">
		<template #fill-text>{{ daysLeftSentence }}</template>
		<template #target-text>Das wird knapp.</template>
		<template #screen-reader-text>{{ daysLeftSentence }} – das wird knapp.</template>
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

const { daysLeftSentence } = inject<DynamicContent>( 'dynamicCampaignText' );
const currentCampaignTimePercentage = inject<number>( 'currentCampaignTimePercentage' );

</script>
