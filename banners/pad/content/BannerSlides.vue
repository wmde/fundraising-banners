<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p class="headline">
			<InfoIcon/>
			<strong> An alle, die Wikipedia in Deutschland nutzen </strong>
		</p>
		<p>Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am
			heutigen {{ currentDayName }} bitten wir Sie bescheiden, die Unabhängigkeit von Wikipedia zu
			sichern.</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>{{ campaignDaySentence }} Insgesamt spenden 99% nichts – sie übergehen diesen Aufruf. Wikipedia wird
			durch Spenden von durchschnittlich 22,66&nbsp;€ finanziert.</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>Doch schon mit einer Spende von 5&nbsp;€ kann Wikipedia sich auch in Zukunft erfolgreich
			entwickeln. <span class="wmde-banner-text-animated-highlight">{{ visitorsVsDonorsSentence }}</span>
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Hat Wikipedia Ihnen in diesem
			Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann nehmen Sie sich doch bitte eine Minute
			Zeit und geben Sie etwas zurück. Vielen Dank!</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';

interface Props {
	currentSlide: number,
}

defineProps<Props>();

const {
	currentDayName,
	campaignDaySentence,
	visitorsVsDonorsSentence
}: DynamicContent = inject( 'dynamicCampaignText' );
</script>
