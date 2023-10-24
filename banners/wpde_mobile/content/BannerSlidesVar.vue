<template>
	<KeenSliderSlide :is-current="currentSlide === 0" class="wmde-banner-slide-content-with-progress-bar">
		<p>Unser Spendenziel: {{ goalDonationSum }} Millionen</p>
		<ProgressBar amount-to-show-on-right="TARGET"/>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>Hi,<br/>
			vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg!
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Am heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie bescheiden, die Unabhängigkeit von
			Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			{{ visitorsVsDonorsSentence }} Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>
			Die durchschnittliche Spende beträgt 22,25&nbsp;€, doch bereits ein kleiner Beitrag hilft uns weiter. Hat
			Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 5">
		<p>
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	currentDate,
	visitorsVsDonorsSentence,
	goalDonationSum
}: DynamicContent = inject( 'dynamicCampaignText' );
</script>
