<template>
	<div class="wmde-banner-double-progress" :class="{ 'is-late-progress' : progressBarContent.isLateProgress }" :style="{
		'--wmde-banner-progress-bar-width': progressBarContent.percentageTowardsTarget + '%',
		'--wmde-banner-progress-bar-time-width': currentCampaignTimePercentage + '%'
	}">
		<div class="wmde-banner-double-progress-labels">
			<div class="wmde-banner-double-progress-labels-left">
				{{ progressBarContent.isLateProgress ? $translate( 'double-progress-close' ) : daysPassedSentence }}
			</div>
			<div class="wmde-banner-double-progress-labels-right">
				{{ progressBarContent.amountNeeded }}
			</div>
		</div>
		<div class="wmde-banner-double-progress-amount">
			<div class="wmde-banner-double-progress-amount-fill">
				<div class="text-fade">
					<slot name="left-text-amount">
						<template v-if="progressBarContent.isLateProgress">
							{{ progressBarContent.amountNeeded }}
						</template>
					</slot>
				</div>
				<div class="text-fade">{{ progressBarContent.amountDonated }}</div>
			</div>
			<div class="wmde-banner-double-progress-amount-difference">!</div>
			<div class="wmde-banner-double-progress-right-text text-fade" v-if="!progressBarContent.isLateProgress">{{ progressBarContent.donationTarget }}</div>
		</div>
		<div class="wmde-banner-double-progress-time">
			<div class="wmde-banner-double-progress-time-fill">
				<div class="text-fade">
					<slot name="left-text-time">
						{{ progressBarContent.isLateProgress ? $translate( 'double-progress-close' ) : '' }}
					</slot>
				</div>
				<div class="text-fade">
					{{ progressBarContent.isLateProgress ? daysLeftSentence : daysPassedSentence }}
				</div>
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
