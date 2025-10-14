<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p class="headline">
			<InfoIconStraight/>
			<strong> An alle, die Wikipedia in Deutschland nutzen </strong>
		</p>
		<p>
			An diesem {{ currentDayName }}, den {{ liveDateAndTime.currentDate }}, um {{ liveDateAndTime.currentTime }} sind
			Sie gefragt: {{ campaignDaySentence }}
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>Wikipedia wird durch Spenden von durchschnittlich {{ averageDonation }} finanziert, aber 99&nbsp;% der
			Lesenden spenden nicht. <strong>Wenn alle, die das jetzt lesen, einen kleinen Beitrag leisten, wäre unser
				Spendenziel bereits heute erreicht.</strong></p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Menschen spenden aus einem einfachen Grund – weil Wikipedia nützlich ist.
			Schon der Preis einer Tasse Kaffee würde genügen.
			<span v-if="visitorsVsDonorsSentence !== ''" class="wmde-banner-text-animated-highlight">{{ visitorsVsDonorsSentence }}</span>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>Wenn Wikipedia eine kommerzielle Seite
			sein würde, wäre das ein riesiger Verlust für die Welt. Sicher könnten wir mit Werbung eine Menge Geld
			verdienen.
			Aber dann wäre Wikipedia komplett anders. Wir könnten ihr nicht vertrauen.</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>Es ist leicht, diese Nachricht zu ignorieren und die meisten werden das wohl tun. Wenn Sie Wikipedia
			nützlich finden, nehmen Sie sich an diesem {{currentDayName }} bitte
			eine Minute Zeit und geben Wikipedia mit Ihrer Spende etwas zurück. <em>Vielen Dank!</em></p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import InfoIconStraight from '@src/components/Icons/InfoIconStraight.vue';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	getCurrentDateAndTime,
	campaignDaySentence,
	visitorsVsDonorsSentence,
	averageDonation
}: DynamicContent = inject( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
