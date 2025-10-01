<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				Auch wenn wir jetzt stören: Klicken Sie bitte nicht weg! Am heutigen {{ currentDayName }}, den
				{{ currentDate }}, können Sie die Unabhängigkeit von Wikipedia stärken.
				<AnimatedText content="Millionen Menschen nutzen Wikipedia, aber 99&nbsp;% spenden nicht – sie übergehen
				diesen Aufruf."/> Vielleicht haben auch Sie bisher gezögert? Doch jetzt brauchen wir Sie wirklich. Denn
				gerade in diesen Zeiten ist Wikipedia wichtiger denn je. Wir bitten nicht um viel, bereits 5&nbsp;€ sind
				ein wirksamer Beitrag. Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
				Dann geben Sie sich bitte einen Ruck. Es geht um Wikipedia, aber zugleich um viel mehr: Setzen Sie jetzt
				mit einer Spende ein Zeichen gegen Fake News und Desinformation – für neutrales Wissen. Vielen Dank!
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
	currentDate
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
