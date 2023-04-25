<template>
	<KeenSlider :interval="5000" :with-navigation="true" :play="play">
		<template #slides-1><div>
			<p class="headline">
				<InfoIcon fill="#990a00"/> <strong> An alle, die Wikipedia in Deutschland nutzen </strong>
			</p>
			<p>
				Bitte verzeihen Sie die Störung. Es ist ein bisschen unangenehm, daher kommen wir gleich zur
				Sache. An diesem {{ currentDayName }} sind Sie gefragt: {{ campaignDaySentence }}</p>
		</div></template>
		<template #slides-2><div>
			<p>Wikipedia wird durch Spenden von durchschnittlich 22,66&nbsp;€ finanziert, aber 99&nbsp;% der
				Lesenden spenden nicht. <strong>Wenn alle, die das jetzt lesen, einen kleinen Beitrag leisten, wäre unser
					Spendenziel bereits heute erreicht.</strong></p>
		</div></template>
		<template #slides-3><div>
			<p>
				Menschen spenden aus einem einfachen Grund – weil Wikipedia nützlich ist.
				Schon der Preis einer Tasse Kaffee würde genügen.
				<span class="wmde-banner-text-animated-highlight">{{ visitorsVsDonorsSentence }}</span>
			</p>
		</div></template>
		<template #slides-4><div>
			<p>Wenn Wikipedia eine kommerzielle Seite
				sein würde, wäre das ein riesiger Verlust für die Welt. Sicher könnten wir mit Werbung eine Menge Geld verdienen.
				Aber dann wäre Wikipedia komplett anders. Wir könnten ihr nicht vertrauen.</p>
		</div></template>
		<template #slides-5><div>
			<p>Es ist leicht, diese Nachricht zu ignorieren und die meisten werden das wohl tun. Wenn Sie Wikipedia
				nützlich finden, nehmen Sie sich an diesem { currentDayName } bitte
				eine Minute Zeit und geben Wikipedia mit Ihrer Spende etwas zurück. <em>Vielen Dank!</em></p>
		</div></template>
	</KeenSlider>
</template>

<script setup lang="ts">
import KeenSlider from '@src/components/Slider/KeenSlider.vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';

interface Props {
	play: boolean
}

defineProps<Props>();

const { currentDayName, campaignDaySentence, visitorsVsDonorsSentence }: DynamicContent = inject( 'dynamicCampaignText' );
</script>
