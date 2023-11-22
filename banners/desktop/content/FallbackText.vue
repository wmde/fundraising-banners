<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				<InfoIcon fill="#990a00"/> <strong>An alle, die Wikipedia in Deutschland nutzen</strong>
			</p>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am
				heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie bescheiden, die Unabhängigkeit
				von Wikipedia zu unterstützen. {{ campaignDaySentence }} <AnimatedText :content="visitorsVsDonorsSentence"/> Die meisten
				Menschen spenden, weil sie Wikipedia nützlich finden.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

const {
	currentDayName,
	currentDate,
	campaignDaySentence,
	visitorsVsDonorsSentence
}: DynamicContent = inject( 'dynamicCampaignText' );

</script>
