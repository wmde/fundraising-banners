<template>
	<div class="wmde-banner-message">
		<div>
			<div class="wmde-banner-message-title">
				<InfoIcon fill="#990000" width="21.5" height="21.5" type="italic"/>
				<strong>&nbsp;Kostenlos, aber nicht kostenfrei</strong>
			</div>
			<div class="wmde-banner-message-date">
				<strong>{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - An alle, die Wikipedia
				in Deutschland nutzen</strong>
			</div>
			<p>
				Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
				{{ currentDayName }} bitten wir Sie, die Unabhängigkeit von Wikipedia zu unterstützen.
				<AnimatedText content="Millionen Menschen nutzen Wikipedia, aber 99&nbsp;% spenden nicht – sie übergehen diesen
				Aufruf."/> Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Die
				durchschnittliche Spende beträgt 22,49&nbsp;€, doch bereits 5&nbsp;€ helfen uns weiter. Hat Wikipedia
				Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann entscheiden Sie sich, eine der
				seltenen Ausnahmen zu sein, und geben Sie etwas zurück. Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import AnimatedText from '@src/components/AnimatedText/AnimatedText.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import InfoIcon from '@src/components/Icons/InfoIcon.vue';

const {
	currentDayName,
	getCurrentDateAndTime
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
