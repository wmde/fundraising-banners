<template>
	<div class="wmde-banner-message">
		<div>
			<p class="banner-text-title">
				&#8220;Wikipedia is not for sale.&#8221; – A personal appeal from Wikipedia-Founder Jimmy Wales
			</p>
			<p>
				Please don't ignore this 1-minute read. This {{ currentDayName }}, {{ currentDate }}, I ask you to
				reflect on the number of times you visited Wikipedia in the past year, the value you got from it,
				and whether you're able to give €5 back. If you can, please join the 1% of readers who give. <span
				class="wmde-banner-text-animated-highlight">If everyone reading this right now gave just €5, we'd
				hit our goal in a couple of hours.</span> It's hard to know what
				to trust online these days. Disinformation and scammers are everywhere. We are passionate about our
				model because we want everyone to have equal access to quality information - something that is becoming
				harder and harder to find online. If Wikipedia has given you €5 worth of knowledge this year, please
				give back. Thank you.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { currentDayName, currentDate }: DynamicContent = inject( 'dynamicCampaignText' );

</script>
