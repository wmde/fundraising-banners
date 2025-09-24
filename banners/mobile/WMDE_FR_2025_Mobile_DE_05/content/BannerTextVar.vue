<template>
	<div class="wmde-banner-message">
		<div>
			<p class="banner-text-title">
				<strong>Hi,</strong>
			</p>
			<p>
				vielleicht kommen wir gerade ungelegen, aber dennoch: Klicken Sie jetzt bitte nicht weg! Am heutigen
				{{ currentDayName }}, den {{ liveDateAndTime.currentDate }}, um {{ liveDateAndTime.currentTime }}
				bitten wir Sie, die Unabhängigkeit von Wikipedia zu unterstützen.
				{{ campaignDaySentence }}
				<span class="wmde-banner-text-highlight">Millionen Menschen nutzen Wikipedia, aber 99&nbsp;% spenden nicht – sie übergehen diesen Aufruf.</span>
				Die meisten Menschen spenden, weil sie Wikipedia nützlich finden.
				Die durchschnittliche Spende beträgt {{ averageDonation }}, doch bereits 10&nbsp;€ helfen uns weiter.
				Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt?
				Dann entscheiden Sie sich, eine der seltenen Ausnahmen zu sein, und geben Sie etwas zurück.
				Vielen Dank!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

interface Props {
	playLiveText: boolean;
}

const props = defineProps<Props>();

const {
	currentDayName,
	getCurrentDateAndTime,
	campaignDaySentence,
	averageDonation
}: DynamicContent = inject( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );

watch( () => props.playLiveText, ( shouldPlay: boolean ) => {
	if ( shouldPlay ) {
		startTimer();
	} else {
		stopTimer();
	}
} );

</script>
