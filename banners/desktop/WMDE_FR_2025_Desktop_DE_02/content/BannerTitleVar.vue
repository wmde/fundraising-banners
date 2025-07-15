<template>
	<div class="wmde-banner-message-header">
		<InfoIconItalic/> <h2>Das Internet, das uns versprochen wurde</h2>
		<p><strong>{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - An alle, die Wikipedia in Deutschland nutzen</strong></p>
	</div>
</template>

<script setup lang="ts">
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIconItalic from '@src/components/Icons/InfoIconItalic.vue';

const { getCurrentDateAndTime } = inject<DynamicContent>( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
