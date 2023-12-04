<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				<InfoIcon fill="#990a00"/> <strong>{{ currentDateTime }} - An alle, die Wikipedia in Deutschland nutzen</strong>
			</p>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
				{{ currentDayName }}, den {{ currentDate }}, bitten wir Sie, die Unabhängigkeit von Wikipedia zu
				unterstützen. {{ campaignDaySentence }} Insgesamt spenden 99% unserer Leserinnen und Leser nichts – sie
				übergehen diesen Aufruf. <AnimatedText :content="visitorsVsDonorsSentence" /> Die meisten Menschen spenden, weil sie
				Wikipedia nützlich finden. Die durchschnittliche Spende beträgt 22,25 €, doch bereits 5 € helfen uns
				weiter. Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann
				entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import { useCurrentDateAndTime } from '@src/components/composables/useCurrentDateAndTime';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';

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
