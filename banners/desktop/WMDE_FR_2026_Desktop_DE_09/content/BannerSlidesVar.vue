<template>
	<KeenSliderSlide :current-slide="currentSlide" :index="0" class="wmde-b-prose" data-align="centered">
		<p>
			Vielleicht kommen wir gerade ungelegen, aber dennoch:
			Weniger Menschen als sonst spenden derzeit für Wikipedia.
			Daher bitten wir Sie am heutigen {{ currentDayName }}, den {{ currentDate }}, die Unabhängigkeit von Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="1" class="wmde-b-prose" data-align="centered">
		<p>
			{{ campaignDaySentence }}
			Kein Konzern oder Milliardär finanziert das Projekt, sondern eine gemeinnützige Organisation.
			<AnimatedText :is-visible="currentSlide === 1">{{ visitorsVsDonorsSentence }}</AnimatedText>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="2" class="wmde-b-prose" data-align="centered">
		<p>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden und einen kostenfreien Zugang zu Wissen
			für alle unbedingt erhalten möchten.
			Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 5&nbsp;€ helfen uns weiter.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="3" class="wmde-b-prose" data-align="centered">
		<p>
			Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück.
			Vielen Dank!
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
	currentDate,
	averageDonation,
	campaignDaySentence,
	visitorsVsDonorsSentence
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
