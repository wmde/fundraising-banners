<template>

	<KeenSliderSlide :is-current="currentSlide === 0">
		<p><strong>Hi,</strong></p>
		<p>
			vielleicht kommen wir gerade ungelegen, aber dennoch: <span class="wmde-banner-text-highlight">Klicken Sie jetzt bitte nicht weg!</span> Am
			heutigen {{ currentDayName }}, den {{ liveDateAndTime.currentDate }}, um {{ liveDateAndTime.currentTime }} bitten wir Sie,
			die Unabhängigkeit von Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			{{ campaignDaySentence }}
			<span class="wmde-banner-text-highlight">Millionen Menschen nutzen Wikipedia, aber 99&nbsp;% spenden nicht – sie übergehen diesen Aufruf.</span>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Die durchschnittliche Spende beträgt {{ averageDonation }}, doch <span class="wmde-banner-text-highlight">bereits 10&nbsp;€ helfen uns weiter.</span> Hat Wikipedia
			Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>

	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und <span class="wmde-banner-text-highlight">geben Sie etwas zurück.</span>
			<strong> Vielen Dank!</strong>
		</p>
	</KeenSliderSlide>

</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted, watch } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

interface Props {
	playLiveText: boolean;
	currentSlide: number
}

const props = defineProps<Props>();

const {
	currentDayName,
	getCurrentDateAndTime,
	campaignDaySentence,
	averageDonation
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
