<template>
	<div class="wmde-banner-minimised-message">
		<InfoIcon fill="#990a00"/>
		<p class="wmde-banner-minimised-title">{{ currentDate }}, {{ currentTime }} - An alle, die Wikipedia in Deutschland nutzen. Die Zeit wird knapp!</p>
		<p>Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann geben Sie jetzt etwas zurück.</p>
	</div>
</template>
<script setup lang="ts">
import InfoIcon from '@src/components/Icons/InfoIcon.vue';
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { useCurrentTime } from '@src/components/composables/useCurrentTime';

const {
	currentDate,
	getCurrentTime
} = inject<DynamicContent>( 'dynamicCampaignText' );

const { currentTime, startTimer, stopTimer } = useCurrentTime( getCurrentTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
