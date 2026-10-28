<template>
	<ProgressBar
		:progress-percentage="progressBarContent.percentageTowardsTarget"
		:is-visible="isVisible"
		class="wmde-c-flow"
	>
		<template #left-text>
			{{ progressBarContent.amountDonated }}
		</template>
		<template #right-text>
			{{ progressBarContent.percentageTowardsTarget.toFixed( 2 ) }}%
		</template>
		<template #screen-reader-text>
			{{
				$translate(
					'progress-bar-screen-reader-text',
					{ current: progressBarContent.amountDonated, target: progressBarContent.donationTargetAmount }
				)
			}}
		</template>
	</ProgressBar>
</template>

<script setup lang="ts">
import ProgressBar from '@src/components/ProgressBar2026/ProgressBar.vue';
import { inject } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

interface Props {
	isVisible: boolean;
}

defineProps<Props>();

const { progressBarContent } = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
