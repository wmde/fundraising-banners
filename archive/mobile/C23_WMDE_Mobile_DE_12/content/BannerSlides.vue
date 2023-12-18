<template>

	<KeenSliderSlide :is-current="currentSlide === 0" class="wmde-banner-slide-content-with-progress-bar">
		<p>Unser Spendenziel: {{ goalDonationSum }} Millionen €</p>
		<ProgressBar amount-to-show-on-right="TARGET"/>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			<strong>Hi,</strong>
		</p>
		<p>vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am
			heutigen {{ currentDayName }}, den {{ currentDate }}, um {{ currentTime }} bitten wir Sie bescheiden,
			die Unabhängigkeit von Wikipedia zu unterstützen.</p>
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
			Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann entscheiden
			Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
		</p>
	</KeenSliderSlide>

</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, watch } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import ProgressBar from '@src/components/ProgressBar/ProgressBar.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useCurrentTime } from '@src/components/composables/useCurrentTime';

interface Props {
	playLiveText: boolean;
	currentSlide: number
}

const props = defineProps<Props>();

const {
	currentDayName,
	currentDate,
	getCurrentTime,
	goalDonationSum,
	visitorsVsDonorsSentence
}: DynamicContent = inject( 'dynamicCampaignText' );

const { currentTime, startTimer, stopTimer } = useCurrentTime( getCurrentTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( !shouldPlay ) {
		stopTimer();
	}
} );
onMounted( startTimer );

</script>
