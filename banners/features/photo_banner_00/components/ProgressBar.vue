<template>
	<div class="wmde-b-progress" :style="`--progress-precentage: ${progressBarContent.percentageTowardsTarget / 1.7}%; --progress-int: ${progressInt};`">
		<div class="wmde-b-progress__track">
			<div class="wmde-b-progress__fill">
				<span class="wmde-b-progress__counter"></span>%
			</div>
		</div>
		<p>
			{{ $translate( 'amount-total', { amount: goalDonationSum } ) }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { goalDonationSum, progressBarContent } = inject<DynamicContent>( 'dynamicCampaignText' );

const progressInt = computed<number>( () => Math.round( progressBarContent.percentageTowardsTarget / 2 ) );

</script>
