<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p>
			Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Wikipedia ist
			weder käuflich, noch lässt sie sich zensieren. Sie ist finanziell unabhängig.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			Deshalb bitten wir Sie am heutigen {{ currentDayName }}, den {{ currentDate }}, um Ihre Unterstützung.
			{{ campaignDaySentence }} <AnimatedText :content="visitorsVsDonorsSentence"/>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 5&nbsp;€ helfen uns weiter. Hat
			Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	currentDate,
	campaignDaySentence,
	visitorsVsDonorsSentence,
	averageDonation
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
