<template>
	<div class="wmde-banner-early">
		<ButtonClose @close="$emit( 'close' )"/>
		<p>Noch fehlen {{ remainingDonationSum }} Millionen Euro zur Erreichung unseres Spendenziels.</p>
		<div class="wmde-banner-early-progress">
			<div class="wmde-banner-early-progress-bar">
				<ProgressBar amount-to-show-on-right="TARGET"/>
			</div>
			<div class="wmde-banner-early-progress-text">
				{{ progressBarContent.donationTarget }}
			</div>
		</div>
		<p>Die Zeit wird knapp.</p>
	</div>
</template>

<script setup lang="ts">

import ButtonClose from '@src/components/ButtonClose/ButtonClose.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { progressBarContent, remainingDonationSum } = inject<DynamicContent>( 'dynamicCampaignText' );
defineEmits( [ 'close' ] );

</script>
