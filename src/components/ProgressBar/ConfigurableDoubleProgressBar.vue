<template>
	<div class="wmde-banner-double-progress" :style="{
		'--wmde-banner-progress-bar-width': progressBarContent.percentageTowardsTarget + '%',
		'--wmde-banner-progress-bar-time-width': currentCampaignTimePercentage + '%'
	}">
		<div class="wmde-banner-double-progress-labels" v-if="withExtraLabels">
			<div class="wmde-banner-double-progress-labels-left">
				<slot name="extra-label-left"/>
			</div>
			<div class="wmde-banner-double-progress-labels-right">
				<slot name="extra-label-right"/>
			</div>
		</div>
		<div class="wmde-banner-double-progress-amount">
			<div class="wmde-banner-double-progress-amount-fill">
				<div class="text-fade">
					<slot name="amount-fill-left"/>
				</div>
				<div class="text-fade">
					<slot name="amount-fill-right"/>
				</div>
			</div>
			<div class="wmde-banner-double-progress-amount-difference">!</div>
			<div class="wmde-banner-double-progress-right-text text-fade">
				<slot name="amount-right"/>
			</div>
		</div>
		<div class="wmde-banner-double-progress-time">
			<div class="wmde-banner-double-progress-time-fill">
				<div class="text-fade">
					<slot name="time-fill-left"/>
				</div>
				<div class="text-fade">
					<slot name="time-fill-right"/>
				</div>
			</div>
			<div class="wmde-banner-double-progress-right-text text-fade">
				<slot name="time-right"/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { progressBarContent } = inject<DynamicContent>( 'dynamicCampaignText' );
const currentCampaignTimePercentage = inject<number>( 'currentCampaignTimePercentage' );

interface Props {
	withExtraLabels?: boolean;
}

withDefaults( defineProps<Props>(), {
	withExtraLabels: false
} );

</script>
