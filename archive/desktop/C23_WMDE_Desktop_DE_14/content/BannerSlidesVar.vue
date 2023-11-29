<template>
	<KeenSliderSlide :is-current="currentSlide === 0">
		<p class="headline">
			<InfoIcon fill="#990a00"/> <strong>{{ currentDateTime }} - An alle, die Wikipedia in Deutschland nutzen</strong>
		</p>
		<p>
			Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am
			heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie bescheiden, die Unabhängigkeit
			von Wikipedia zu unterstützen.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 1">
		<p>
			{{ campaignDaySentence }} <AnimatedText :content="visitorsVsDonorsSentence"/>
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 2">
		<p>
			Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Die durchschnittliche Spende
			beträgt 22,25&nbsp;€, doch bereits 5&nbsp;€ helfen uns weiter.
		</p>
	</KeenSliderSlide>
	<KeenSliderSlide :is-current="currentSlide === 3">
		<p>
			Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann entscheiden
			Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
		</p>
	</KeenSliderSlide>
</template>

<script setup lang="ts">
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { inject, onMounted, onUnmounted } from 'vue';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import KeenSliderSlide from '@src/components/Slider/KeenSliderSlide.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useCurrentDateAndTime } from '@src/components/composables/useCurrentDateAndTime';

interface Props {
	currentSlide: number
}

defineProps<Props>();

const {
	currentDayName,
	currentDate,
	getCurrentDateAndTime,
	campaignDaySentence,
	visitorsVsDonorsSentence
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { currentDateTime, startTimer, stopTimer } = useCurrentDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
