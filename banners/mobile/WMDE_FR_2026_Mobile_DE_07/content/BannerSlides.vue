<template>

	<KeenSliderSlide
		:current-slide="currentSlide"
		:index="0"
		class="wmde-b-prose wmde-c-flow"
		data-align="centered">
		<p>Unser Spendenziel: {{ goalDonationSum }} Millionen €</p>
		<ProgressBar :is-visible="playLiveText"></ProgressBar>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="1" class="wmde-b-prose" data-align="centered">
		<p><strong>Hi,</strong></p>
		<p>
			vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
			{{ currentDayName }}, um {{ liveDateAndTime.currentTime }} bitten wir Sie, die Unabhängigkeit von Wikipedia
			zu unterstützen.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="2" class="wmde-b-prose" data-align="centered">
		<p>
			{{ campaignDaySentence }}
			<AnimatedText :is-visible="currentSlide === 2">{{ visitorsVsDonorsSentence }}</AnimatedText>
			Die meisten spenden, weil sie Wikipedia nützlich finden.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="3" class="wmde-b-prose" data-align="centered">
		<p>
			Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 10&nbsp;€ helfen uns weiter. Hat
			Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :current-slide="currentSlide" :index="4" class="wmde-b-prose" data-align="centered">
		<p>
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück.
			<strong> Vielen Dank!</strong>
		</p>
	</KeenSliderSlide>

</template>

<script setup lang="ts">
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted, watch } from 'vue';
import KeenSliderSlide from '@src/components/Slider2026/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText2026/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import ProgressBar from '../components/ProgressBar.vue';

interface Props {
	playLiveText: boolean;
	currentSlide: number
}

const props = defineProps<Props>();

const {
	currentDayName,
	getCurrentDateAndTime,
	averageDonation,
	goalDonationSum,
	campaignDaySentence,
	visitorsVsDonorsSentence
}: DynamicContent = inject( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( !shouldPlay ) {
		stopTimer();
	}
} );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
