<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p>
			<strong>{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - An alle, die Wikipedia in
			Deutschland nutzen</strong>
		</p>
		<p>
			Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
			{{ currentDayName }} bitten wir Sie, die Unabhängigkeit von Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			<AnimatedText content="Millionen Menschen nutzen Wikipedia, aber 99&nbsp;% spenden nicht – sie übergehen
			diesen Aufruf."/> Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Die durchschnittliche Spende beträgt 22,49&nbsp;€, doch bereits 5&nbsp;€ helfen uns weiter. Hat Wikipedia
			Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
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
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	getCurrentDateAndTime
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { liveDateAndTime } = useLiveDateAndTime( getCurrentDateAndTime );

</script>
