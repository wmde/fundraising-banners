<template>
	<div class="wmde-banner-minimised-message">
		<InfoIconItalic/>
		<p class="wmde-banner-minimised-title">
			{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - An alle, die Wikipedia in Deutschland nutzen
		</p>
		<p>
			Hat Wikipedia Ihnen in diesem Jahr Wissen im Wert einer Tasse Kaffee geschenkt? Dann geben Sie jetzt etwas zurück.
		</p>
	</div>
</template>
<script setup lang="ts">

import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import InfoIconItalic from '@src/components/Icons/InfoIconItalic.vue';
const { getCurrentDateAndTime } = inject<DynamicContent>( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
