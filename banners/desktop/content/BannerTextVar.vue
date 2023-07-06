<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				<InfoIcon fill="#990a00"/>
				<strong> An alle, die Wikipedia in Deutschland nutzen </strong>
			</p>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
				{{ currentDayName }} bitten wir Sie, sich bewusst zu machen, wie häufig Sie Wikipedia in diesem Jahr
				genutzt haben, wie groß der Nutzen für Sie war und ob Sie jetzt etwas zurückgeben können.
				<span class="wmde-banner-text-animated-highlight">Millionen Menschen nutzen Wikipedia, aber 99 %
				spenden nicht – sie übergehen diesen Aufruf.</span> Die meisten Menschen spenden, weil sie Wikipedia
				nützlich finden. Die durchschnittliche Spende beträgt 22,25 €, doch bereits eine Spende von 5 € hilft
				uns weiter. Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann
				entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';

const { currentDayName }: DynamicContent = inject( 'dynamicCampaignText' );

</script>
