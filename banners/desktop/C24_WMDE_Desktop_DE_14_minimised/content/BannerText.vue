<template>
	<div class="wmde-banner-message">
		<div>
			<div class="wmde-banner-message-title">
				<InfoIconItalic/>
				<strong>&nbsp;Wikipedia ist unverkäuflich</strong>
			</div>
			<div class="wmde-banner-message-date">
				<strong>{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - An alle, die Wikipedia
					in Deutschland nutzen</strong>
			</div>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
				{{ currentDayName }}, den {{ currentDate }}, bitten wir Sie, die Unabhängigkeit von Wikipedia zu unterstützen.
				{{campaignDaySentence}}
				<AnimatedText :content="visitorsVsDonorsSentence"/>
				Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
				Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 5&nbsp;€ helfen uns weiter.
				Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
				Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück.
				Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import InfoIconItalic from '@src/components/Icons/InfoIconItalic.vue';

const {
	currentDayName,
	getCurrentDateAndTime,
	currentDate,
	campaignDaySentence,
	visitorsVsDonorsSentence,
	averageDonation
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
