<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p class="headline">
			<InfoIcon fill="#990a00"/>
			<strong> &#8220;Wikipedia geht es nicht um Profit.&#8221; – Persönliche Botschaft von Wikipedia-Gründer Jimmy Wales</strong>
		</p>
		<p>
			Schenken Sie mir eine Minute Ihrer Zeit. Am heutigen {{ currentDayName }}, den {{ currentDate }}, bitte
			ich Sie darüber nachzudenken, wie oft Sie Wikipedia in diesem Jahr aufgerufen haben, wieviel Wissen sie
			Ihnen geschenkt hat und – wenn möglich – 5&nbsp;€ zurückzugeben.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			Bitte schließen Sie sich dem 1&nbsp;% aller Wikipedia-Nutzenden an, die etwas
			spenden. <span class="wmde-banner-text-animated-highlight">Würden alle, die dies jetzt lesen, jeweils 5&nbsp;€ geben,
			wäre unsere Spendenkampagne in wenigen Stunden vorbei.</span>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Mehr denn je müssen wir heute im Internet vorsichtig sein: Desinformation und Betrug sind allgegenwärtig.
			Wikipedia ist anders. Zwar ist sie nicht perfekt, doch um Profit oder Meinungsmache geht es bei ihr nicht.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Sie ist ein Gemeinschaftswerk, im Grunde eine öffentliche Einrichtung, wie eine Bibliothek oder ein Park.
			Genau darum geht es uns: Alle haben hier kostenlosen Zugang zu qualitativ hochwertigen Informationen. Wo gibt es das denn sonst noch?
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>
			Wenn Wikipedia Ihnen in diesem Jahr Wissen im Wert von 5&nbsp;€ vermittelt hat, geben Sie bitte etwas zurück.
			Kein Betrag ist zu klein, jede Spende zählt. <em>Vielen Dank!</em>
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	currentDate
}: DynamicContent = inject( 'dynamicCampaignText' );
</script>
