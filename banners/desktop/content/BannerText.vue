<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				<InfoIcon fill="#990a00"/> {{ currentDate }}, {{ currentTime }} - An alle, die Wikipedia in Deutschland
				nutzen. Die Zeit wird knapp! Noch fehlen {{ remainingDonationSum }}.
			</p>
			<p>
				Verzeihen Sie die Störung, aber es ist dringend. {{ campaignDaySentence }} Daher bitten wir Sie am
				heutigen {{ currentDayName }}, den {{ currentDate }}, die Unabhängigkeit von Wikipedia zu unterstützen.
				<AnimatedText :content="visitorsVsDonorsSentence"/> Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Die
				durchschnittliche Spende beträgt 22,25&nbsp;€, doch bereits 5&nbsp;€ helfen uns weiter. Hat Wikipedia
				Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann ist jetzt der Zeitpunkt, eine
				der seltenen Ausnahmen zu sein und etwas zurückzugeben. Helfen Sie uns, unser Spendenziel zu erreichen.
				Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useCurrentTime } from '@src/components/composables/useCurrentTime';

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
