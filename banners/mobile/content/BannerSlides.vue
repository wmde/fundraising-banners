<template>

	<KeenSliderSlide :is-current="currentSlide === 0">
		<p>An alle, die Wikipedia in Deutschland nutzen:</p>
		<p>Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg!</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>Am heutigen {{ currentDayName }} bitten wir Sie bescheiden, die Unabhängigkeit von Wikipedia zu unterstützen.</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			<span class="wmde-banner-text-animated-highlight">
				Millionen Menschen nutzen Wikipedia, aber 99 % spenden nicht – sie übergehen diesen Aufruf.
			</span>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Die durchschnittliche Spende beträgt 22,25&nbsp;€, doch bereits 5 € helfen uns weiter. Hat Wikipedia Ihnen
			in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück.
			Vielen Dank!
		</p>
	</KeenSliderSlide>

</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName
}: DynamicContent = inject( 'dynamicCampaignText' );
</script>
