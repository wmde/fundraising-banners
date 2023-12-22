<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p>
			<InfoIcon fill="#990a00"/>
			<strong>
				{{ currentDate }}, {{ currentTime }} - An alle, die Wikipedia in Deutschland nutzen. Die Zeit wird
				knapp! Noch fehlen {{ remainingDonationSum }}.
			</strong>
		</p>
		<p>
			Verzeihen Sie die Störung, aber es ist dringend. {{ campaignDaySentence }}
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			Daher bitten wir Sie am heutigen {{ currentDayName }}, den {{ currentDate }}, die Unabhängigkeit von
			Wikipedia zu unterstützen. <AnimatedText :content="visitorsVsDonorsSentence"/>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Die meisten Menschen spenden, weil sie
			Wikipedia nützlich finden. Die durchschnittliche Spende beträgt 22,25&nbsp;€, doch bereits 5&nbsp;€ helfen
			uns weiter.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann ist jetzt der
			Zeitpunkt, eine der seltenen Ausnahmen zu sein und etwas zurückzugeben. Helfen Sie uns, unser Spendenziel
			zu erreichen. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted } from 'vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useCurrentTime } from '@src/components/composables/useCurrentTime';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	currentDate,
	getCurrentTime,
	campaignDaySentence,
	remainingDonationSum,
	visitorsVsDonorsSentence
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { currentTime, startTimer, stopTimer } = useCurrentTime( getCurrentTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
