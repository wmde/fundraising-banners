<template>
	<div class="wmde-banner-message-header">
		<InfoIconItalic/> <h2>Wikipedia ist unverkäuflich</h2>
		<p class="headline">
			An diesem {{ currentDayName }}, den {{ liveDateAndTime.currentDate }}, um {{ liveDateAndTime.currentTime }} sind Sie gefragt:
		</p>
	</div>
</template>

<script setup lang="ts">
import InfoIconItalic from '@src/components/Icons/InfoIconItalic.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import { inject, onMounted, onUnmounted } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { getCurrentDateAndTime, currentDayName } = inject<DynamicContent>( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
