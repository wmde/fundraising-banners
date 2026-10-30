<template>
	<KeenSliderSlide :current-slide="currentSlide" :index="0" class="wmde-b-prose" data-align="centered">
		<p>
			{{ campaignDaySentence }} Wikipedia wird durch Spenden von durchschnittlich {{ averageDonation }} finanziert, aber 99&nbsp;% der
			Lesenden spenden nicht. <strong>Wenn alle, die das jetzt lesen, einen kleinen Beitrag leisten, wäre unser
				Spendenziel bereits heute erreicht.</strong>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="1" class="wmde-b-prose" data-align="centered">
		<p>
			Menschen spenden aus einem einfachen Grund – weil Wikipedia nützlich ist.
			Schon der Preis einer Tasse Kaffee würde genügen.
			<AnimatedText :is-visible="currentSlide === 1">{{ visitorsVsDonorsSentence }}</AnimatedText>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="2" class="wmde-b-prose" data-align="centered">
		<p>
			Wenn Wikipedia eine kommerzielle Seite
			sein würde, wäre das ein riesiger Verlust für die Welt. Sicher könnten wir mit Werbung eine Menge Geld
			verdienen.
			Aber dann wäre Wikipedia komplett anders. Wir könnten ihr nicht vertrauen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="3" class="wmde-b-prose" data-align="centered">
		<p>
			Es ist leicht, diese Nachricht zu ignorieren und die meisten werden das wohl tun. Wenn Sie Wikipedia
			nützlich finden, nehmen Sie sich an diesem {{currentDayName }} bitte
			eine Minute Zeit und geben Wikipedia mit Ihrer Spende etwas zurück. <em>Vielen Dank!</em>
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import KeenSliderSlide from '@src/components/Slider2026/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText2026/AnimatedText.vue';

interface Props {
	currentSlide: number;
}

defineProps<Props>();

const {
	currentDayName,
	averageDonation,
	visitorsVsDonorsSentence,
	campaignDaySentence
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
