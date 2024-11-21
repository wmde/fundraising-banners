<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<div class="wmde-banner-message-title">
			<InfoIcon fill="#990000" width="21.5" height="21.5" type="italic"/>
			<strong>&nbsp;Wikipedia ist unverkäuflich</strong>
		</div>
		<div class="wmde-banner-message-date">
			<strong>{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - An alle, die Wikipedia in
				Deutschland nutzen</strong>
		</div>
		<p>
			Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
			{{ currentDayName }}, den {{ currentDate }}, bitten wir Sie, die Unabhängigkeit von Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			{{campaignDaySentence}}
			<AnimatedText :content="visitorsVsDonorsSentence"/>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 5&nbsp;€ helfen uns weiter. Hat Wikipedia
			Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Falls Sie zögern,
			<button
				class="wmde-banner-reasons-to-donate-link"
				@click.prevent="$emit( 'showReasonsToDonate' )">
				hier sind 10 gute Gründe
			</button>
			für eine Spende. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted, watch } from 'vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';

interface Props {
	playLiveText: boolean;
	currentSlide: number
}
defineEmits( [ 'showReasonsToDonate' ] );

const props = defineProps<Props>();

const {
	currentDayName,
	getCurrentDateAndTime,
	currentDate,
	campaignDaySentence,
	visitorsVsDonorsSentence,
	averageDonation
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( !shouldPlay ) {
		stopTimer();
	}
} );

onMounted( startTimer );
onUnmounted( stopTimer );

</script>
