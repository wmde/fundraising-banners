<template>
	<KeenSliderSlide :current-slide="currentSlide" :index="0">
		<p><strong>Wikipedia ist unverkäuflich</strong></p>
		<p>
			Hi, vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg!
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="1">
		<p>
			Am heutigen {{ currentDayName }}, den {{ liveDateAndTime.currentDate }}, um {{ liveDateAndTime.currentTime }} bitten
			wir Sie, die Unabhängigkeit von Wikipedia zu unterstützen. {{ campaignDaySentence }}
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="2">
		<p>
			<AnimatedText :is-visible="currentSlide === 0" :content="visitorsVsDonorsSentence" />
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="3">
		<p>
			Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 10&nbsp;€ helfen uns weiter. Hat
			Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :current-slide="currentSlide" :index="4">
		<p>
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import KeenSliderSlide from '../components/var/KeenSliderSlide.vue';
import AnimatedText from '../components/var/AnimatedText.vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted, watch } from 'vue';
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
	averageDonation,
	goalDonationSum,
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
