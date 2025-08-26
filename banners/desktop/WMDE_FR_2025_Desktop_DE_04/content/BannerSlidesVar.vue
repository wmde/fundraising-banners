<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p>
			Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Seit 25 Jahren
			steht Wikipedia für ein Internet, das von Menschen erschaffen wird – nicht von Maschinen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			Dahinter steckt kein Konzern oder Milliardär, sondern eine gemeinnützige Organisation, die sich durch
			Spenden finanziert. Am heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie, diese
			Unabhängigkeit zu unterstützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			<AnimatedText content="Millionen Menschen nutzen Wikipedia, aber 99 % spenden nicht – sie übergehen diesen
			Aufruf."/>Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Die durchschnittliche Spende
			beträgt {{ averageDonation }}, doch bereits 5&nbsp;€ helfen uns weiter.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann entscheiden Sie sich,
			eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
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
	averageDonation
} = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
