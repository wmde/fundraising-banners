<template>
	<div class="wmde-fbb-message">
		<div class="wmde-fbb-message-content">
			<p>
				<InfoIconItalic/> <strong>An diesem {{ currentDayName }}, den {{ liveDateAndTime.currentDate }}, um {{ liveDateAndTime.currentTime }} sind Sie gefragt:</strong>
			</p>
			<p>
				{{ campaignDaySentence }} Millionen Menschen nutzen Wikipedia, aber 99&nbsp;% spenden nicht – sie
				übergehen diesen Aufruf. Wenn Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee
				geschenkt hat, dann geben Sie etwas zurück. Danke!
			</p>
		</div>
		<slot/>
	</div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIconItalic from '@src/components/Icons/InfoIconItalic.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

const { currentDayName, campaignDaySentence, getCurrentDateAndTime }: DynamicContent = inject( 'dynamicCampaignText' );

const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
