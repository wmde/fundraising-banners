<template>
	<div class="wmde-c-flow" :style="{ '--fill-percentage' : progressBarContent.percentageTowardsTarget + '%' }">
		<div class="wmde-c-repel">
			<p>{{ progressBarContent.amountDonated }}</p>
			<p>{{ Math.floor( progressBarContent.percentageTowardsTarget ) }}%</p>
		</div>
		<div class="wmde-b-progress">
			<div class="wmde-b-progress__fill"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { progressBarContent } = inject<DynamicContent>( 'dynamicCampaignText' );
</script>
