<template>
	<div class="wmde-b-prose wmde-c-flow">
		<p>
			Vielen Dank, dass Sie am heutigen {{ currentDayName }} etwas zurückgeben möchten.
			<AnimatedText :is-visible="isVisible">Die meisten spenden, weil sie Wikipedia nützlich finden
				und einen kostenfreien Zugang zu Wissen für alle unbedingt erhalten möchten.</AnimatedText>
			Ob Sie sich nun am Durchschnitt von {{ averageDonation }} orientieren,
			den typischen 10&nbsp;€ für eine erste Spende folgen
			oder den Gegenwert einer Tasse Kaffee spenden – jeder Betrag hilft.
			Doch egal wie hoch die Spende ist – entscheidend ist, dass Sie sich engagieren.
			<strong>Danke für Ihre Hilfe!</strong>
		</p>
	</div>
</template>

<script setup lang="ts">
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import AnimatedText from '@src/components/AnimatedText2026/AnimatedText.vue';

interface Props {
	isVisible: boolean;
}

defineProps<Props>();

const { currentDayName, averageDonation }: DynamicContent = inject( 'dynamicCampaignText' );

</script>
