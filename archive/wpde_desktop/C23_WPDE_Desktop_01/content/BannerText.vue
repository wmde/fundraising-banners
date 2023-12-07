<template>
	<div class="wmde-banner-message">
		<div>
			<p>
                <InfoIcon fill="#990a00"/>
				An alle, die Wikipedia in Deutschland nutzen. Bitte verzeihen Sie die Störung. Es ist ein bisschen
				unangenehm, daher kommen wir gleich zur Sache. An diesem {{ currentDayName }}, den {{ currentDate }}, sind Sie gefragt:
			</p>
			<p>
				{{ campaignDaySentence }} Wikipedia wird durch Spenden von durchschnittlich 22,25&nbsp;€ finanziert, aber 99&nbsp;% der
				Lesenden spenden nicht. <strong>Wenn alle, die das jetzt lesen, einen kleinen Beitrag leisten, wäre unser
				Spendenziel bereits heute erreicht.</strong> Menschen spenden aus einem einfachen Grund – weil
				Wikipedia nützlich ist. Schon der Preis einer Tasse Kaffee würde genügen.
				<span v-if="visitorsVsDonorsSentence !== ''" class="wmde-banner-text-animated-highlight">{{ visitorsVsDonorsSentence }}</span> Wenn Wikipedia
				eine kommerzielle Seite sein würde, wäre das ein riesiger Verlust für die Welt. Sicher könnten wir mit
				Werbung eine Menge Geld verdienen. Aber dann wäre Wikipedia komplett anders. Wir könnten ihr nicht
				vertrauen. Es ist leicht, diese Nachricht zu ignorieren und die meisten werden das wohl tun. Wenn Sie
				Wikipedia nützlich finden, nehmen Sie sich an diesem {{ currentDayName }} bitte eine Minute Zeit und geben
				Wikipedia mit Ihrer Spende etwas zurück. <em>Vielen Dank!</em>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';

const { currentDayName, currentDate, campaignDaySentence, visitorsVsDonorsSentence }: DynamicContent = inject( 'dynamicCampaignText' );

</script>
