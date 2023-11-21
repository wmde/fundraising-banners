<template>

	<KeenSliderSlide :is-current="currentSlide === 0" class="wmde-banner-slide-content-with-progress-bar">
		<p>Unser Spendenziel: {{ goalDonationSum }} Millionen €</p>
		<ProgressBar amount-to-show-on-right="TARGET"/>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			<strong>Hi,</strong>
		</p>
		<p>
			vielleicht kommen wir gerade ungelegen, aber dennoch: Klicke jetzt bitte nicht weg! Am heutigen
			{{ currentDayName }}, den {{ currentDate }}, bitten wir dich bescheiden, die Unabhängigkeit von
			Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Insgesamt spenden 99% nichts - sie übergehen diesen Aufruf. Die durchschnittliche Spende beträgt
			22,25&nbsp;€, doch bereits 10&nbsp;€ helfen uns weiter.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			<AnimatedText :content="visitorsVsDonorsSentence"/>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>
			Hat Wikipedia dir in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann entscheide dich, eine
			der seltenen Ausnahmen zu sein, und gib etwas zurück. Vielen Dank!
		</p>
	</KeenSliderSlide>

</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	currentDate,
	goalDonationSum,
	visitorsVsDonorsSentence
}: DynamicContent = inject( 'dynamicCampaignText' );

</script>
