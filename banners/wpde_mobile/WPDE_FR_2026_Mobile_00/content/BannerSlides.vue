<template>
	<KeenSliderSlide :is-current="currentSlide === 0" class="wmde-banner-slide-content-with-progress-bar">
		<p>Unser Spendenziel: {{ goalDonationSum }} Millionen Euro</p>
		<ProgressBar amount-to-show-on-right="MISSING"/>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			An alle, die Wikipedia in Deutschland nutzen: Vielleicht kommen wir gerade ungelegen, aber dennoch:
			Klicken Sie jetzt bitte nicht weg! Am heutigen {{ currentDayName }}, den {{ currentDate }} um
			{{ liveDateAndTime.currentTime }} Uhr, bitten wir Sie bescheiden, die Unabhängigkeit von Wikipedia zu
			unterstützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			{{ campaignDaySentence }} Insgesamt spenden 99% nichts – sie übergehen diesen
			Aufruf. Wikipedia wird durch Spenden von durchschnittlich {{ averageDonation }} finanziert.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Doch schon mit einer Spende von 5&nbsp;€ kann Wikipedia sich auch in Zukunft erfolgreich entwickeln.
			<AnimatedText :content="visitorsVsDonorsSentence"/>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 4">
		<p>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Hat Wikipedia Ihnen in diesem Jahr Wissen
			im Wert einer Tasse Kaffee geschenkt? Dann nehmen Sie sich doch bitte eine Minute Zeit und geben Sie etwas
			zurück. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, watch } from 'vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

interface Props {
	playLiveText: boolean;
	currentSlide: number
}

const props = defineProps<Props>();

const {
	getCurrentDateAndTime,
	currentDayName,
	currentDate,
	visitorsVsDonorsSentence,
	goalDonationSum,
	averageDonation,
	campaignDaySentence
}: DynamicContent = inject( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( !shouldPlay ) {
		stopTimer();
	}
} );
onMounted( startTimer );

</script>
