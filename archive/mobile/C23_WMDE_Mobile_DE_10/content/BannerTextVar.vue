<template>
	<div class="wmde-banner-message">
		<div>
			<p class="banner-text-title">
				<strong>Hi,</strong>
			</p>
			<p>
				vielleicht kommen wir gerade ungelegen, aber dennoch: Klicke jetzt bitte nicht weg! Am heutigen
				{{ currentDayName }}, den {{ currentDate }}, bitten wir dich bescheiden, die Unabhängigkeit von
				Wikipedia zu unterstützen. Insgesamt spenden 99% nichts - sie übergehen diesen Aufruf. Die
				durchschnittliche Spende beträgt 22,25&nbsp;€, doch bereits 10&nbsp;€ helfen uns weiter.
				<AnimatedText :content="visitorsVsDonorsSentence"/> Die meisten Menschen spenden, weil sie Wikipedia
				nützlich finden. Hat Wikipedia dir in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann
				entscheide dich, eine der seltenen Ausnahmen zu sein, und gib etwas zurück. Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

const {
	currentDayName,
	currentDate,
	visitorsVsDonorsSentence
}: DynamicContent = inject( 'dynamicCampaignText' );

</script>
