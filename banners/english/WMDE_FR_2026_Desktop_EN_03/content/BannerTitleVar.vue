<template>
	<h2 class="wmde-b-icon-text wmde-c-cluster"><InfoIconItalic/> The internet is changing.</h2>
	<p class="headline">
		<strong>{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }}: An important update for readers in Germany.</strong>
	</p>
</template>

<script setup lang="ts">
import InfoIconItalic from '@src/components/Icons/InfoIconItalic.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import { inject, onMounted, onUnmounted } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { getCurrentDateAndTime } = inject<DynamicContent>( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
