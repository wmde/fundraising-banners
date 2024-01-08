<template>
	<div class="wmde-banner-message">
		<div>
			<p class="banner-text-title">
				<strong>Hi,</strong>
			</p>
			<p>
				vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
				{{ currentDayName }}, den {{ currentDate }}, um {{ currentTime }} bitten wir Sie bescheiden, die Unabhängigkeit von
				Wikipedia zu unterstützen. Insgesamt spenden 99% nichts - sie übergehen diesen Aufruf. Die
				durchschnittliche Spende beträgt 22,25&nbsp;€, doch bereits 10&nbsp;€ helfen uns weiter.
				<AnimatedText :content="visitorsVsDonorsSentence"/> Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Hat
				Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann entscheiden Sie sich,
				eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useCurrentTime } from '@src/components/composables/useCurrentTime';

interface Props {
	playLiveText: boolean;
}

const props = defineProps<Props>();

const {
	currentDayName,
	getCurrentTime,
	currentDate,
	visitorsVsDonorsSentence
}: DynamicContent = inject( 'dynamicCampaignText' );

const { currentTime, startTimer, stopTimer } = useCurrentTime( getCurrentTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( shouldPlay ) {
		startTimer();
	} else {
		stopTimer();
	}
} );

</script>
