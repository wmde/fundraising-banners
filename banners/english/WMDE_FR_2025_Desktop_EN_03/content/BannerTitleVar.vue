<template>
	<div class="wmde-banner-message-header">
		<h2><InfoIconItalic/> Wikipedia is not for sale</h2>
		<p class="headline">
			{{ liveDateAndTime.currentDate }}, {{ liveDateAndTime.currentTime }} - To all who use Wikipedia in Germany
		</p>
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
