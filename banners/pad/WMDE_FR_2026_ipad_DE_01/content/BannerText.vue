<template>
	<p>
		{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - An alle, die Wikipedia in
		Deutschland nutzen: Vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht
		weg! Am heutigen {{ currentDayName }}, den {{ currentDate }}, bitten wir Sie, die Unabhängigkeit von
		Wikipedia zu unterstützen.
	</p>
	<p>
		{{ campaignDaySentence }}
		Insgesamt spenden 99&nbsp;% nichts – sie übergehen diesen Aufruf. Wikipedia wird
		durch Spenden von durchschnittlich {{ averageDonation }} finanziert.
	</p>
	<p>
		Doch schon mit einer Spende von 5&nbsp;€ kann Wikipedia sich auch in Zukunft erfolgreich
		entwickeln. {{ visitorsVsDonorsSentence }}
	</p>
	<p>
		Die meisten Menschen spenden, weil sie Wikipedia nützlich finden. Hat Wikipedia Ihnen in diesem
		Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann nehmen Sie sich doch bitte eine Minute
		Zeit und geben Sie etwas zurück. Vielen Dank!
	</p>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

const {
	currentDayName,
	currentDate,
	averageDonation,
	getCurrentDateAndTime,
	visitorsVsDonorsSentence,
	campaignDaySentence
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
