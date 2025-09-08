<template>
	<div class="wmde-banner-message-header">
		<InfoIconItalic/> <h2>Wikipedia ist unverkäuflich – auch dank Ihnen</h2>
		<p>
			{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - An alle, die in Deutschland ein
			Zeichen setzen wollen
		</p>
	</div>
</template>

<script setup lang="ts">
import InfoIconItalic from '@src/components/Icons/InfoIconItalic.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';
import { inject, onMounted, onUnmounted } from 'vue';
import { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { getCurrentDateAndTime } = inject<DynamicContent>( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
