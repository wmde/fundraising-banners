<template>
	<div class="wmde-banner-message">
		<div>
			<p>
				<InfoIcon fill="#990a00"/> <strong>{{ currentDateTime }} - Aus Deutschland benötigen wir heute {{ averageDailyDonors }} Spenden</strong>
			</p>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am
				heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie, die Unabhängigkeit
				von Wikipedia zu unterstützen. {{ campaignDaySentence }} <AnimatedText :content="visitorsVsDailyDonorsSentence"/> Die meisten
				Menschen spenden, weil sie Wikipedia nützlich finden. Die durchschnittliche Spende beträgt 22,25&nbsp;€,
				doch bereits 5&nbsp;€ helfen uns weiter. Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse
				Kaffee geschenkt? Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas
				zurück. Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useCurrentDateAndTime } from '@src/components/composables/useCurrentDateAndTime';
import { DailyDonorStatsValues } from '@src/utils/DynamicContent/DailyDonorAverage';

const {
	currentDayName,
	currentDate,
	getCurrentDateAndTime,
	campaignDaySentence
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { averageDailyDonors } = inject<DailyDonorStatsValues>( 'dailyDonorAverage' );
const visitorsVsDailyDonorsSentence = inject<string>( 'visitorsVsDailyDonorsSentence' );

const { currentDateTime, startTimer, stopTimer } = useCurrentDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
