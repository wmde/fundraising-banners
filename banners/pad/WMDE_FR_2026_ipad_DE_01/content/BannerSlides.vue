<template>
	<KeenSliderSlide :current-slide="currentSlide" :index="0" class="wmde-b-prose" data-align="centered">
		<p>
			<InfoIconStraight/>
			{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - An alle, die Wikipedia in
			Deutschland nutzen: Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht
			weg! Am heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie, die Unabhängigkeit von
			Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="1" class="wmde-b-prose" data-align="centered">
		<p>
			{{ campaignDaySentence }}
			Insgesamt spenden 99&nbsp;% nichts – sie übergehen diesen Aufruf. Wikipedia wird
			durch Spenden von durchschnittlich {{ averageDonation }} finanziert.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="2" class="wmde-b-prose" data-align="centered">
		<p>
			Doch schon mit einer Spende von 5&nbsp;€ kann Wikipedia sich auch in Zukunft erfolgreich
			entwickeln. <AnimatedText :is-visible="currentSlide === 2">{{ visitorsVsDonorsSentence }}</AnimatedText>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="3" class="wmde-b-prose" data-align="centered">
		<p>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Hat Wikipedia Ihnen in diesem
			Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann nehmen Sie sich doch bitte eine Minute
			Zeit und geben Sie etwas zurück. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted } from 'vue';
import KeenSliderSlide from '@src/components/Slider2026/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText2026/AnimatedText.vue';
import InfoIconStraight from '@src/components/Icons/InfoIconStraight.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

interface Props {
	currentSlide: number;
}

defineProps<Props>();

const {
	currentDayName,
	currentDate,
	averageDonation,
	getCurrentDateAndTime,
	visitorsVsDonorsSentence,
	campaignDaySentence
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
