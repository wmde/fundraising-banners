<template>
	<div class="wmde-banner-message">
		<div>
			<p class="banner-text-title">
				<strong>Hi,</strong>
			</p>
			<p>
				vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht
				weg! Am heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie bescheiden, die
				Unabhängigkeit von Wikipedia zu unterstützen. Insgesamt spenden 99% nichts - sie übergehen
				diesen Aufruf. Die durchschnittliche Spende beträgt 22,25&nbsp;€, doch bereits ein kleiner Beitrag
				hilft uns weiter.
				<span class="wmde-banner-text-animated-highlight">{{ visitorsVsDonorsSentence }}</span>
				Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Hat Wikipedia Ihnen in diesem Jahr
				Wissen im Wert einer Tasse Kaffee geschenkt? Dann entscheiden Sie sich, eine der seltenen Ausnahmen
				zu sein, und geben Sie etwas zurück. Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const {
	currentDayName,
	visitorsVsDonorsSentence
}: DynamicContent = inject( 'dynamicCampaignText' );

const currentDate = computed( () => {
	return new Intl.DateTimeFormat( 'de-DE', {
		day: '2-digit',
		month: 'long'
	} ).format( new Date() );
} );

</script>
