<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p class="headline">
			<InfoIcon fill="#990a00"/> <strong> An alle, die Wikipedia in Deutschland nutzen </strong>
		</p>
		<p>
			Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg!
			Am heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie bescheiden, die Unabhängigkeit von Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			<span class="wmde-banner-text-animated-highlight">Millionen Menschen nutzen Wikipedia, aber 99&nbsp;% spenden
			nicht – sie übergehen diesen Aufruf.</span>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Die durchschnittliche Spende beträgt 22,25&nbsp;€, doch bereits 5&nbsp;€ helfen uns weiter. Hat Wikipedia Ihnen in
			diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Jede Spende zählt. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { computed, inject } from 'vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const { currentDayName }: DynamicContent = inject( 'dynamicCampaignText' );

const currentDate = computed( () => {
	return new Intl.DateTimeFormat( 'de-DE', {
		day: '2-digit',
		month: 'long'
	} ).format( new Date() );
} );

</script>
