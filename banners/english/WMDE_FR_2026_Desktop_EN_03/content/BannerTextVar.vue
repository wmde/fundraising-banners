<template>
	<p class="wmde-b-icon-text">
		<InfoIcon fill="#990a00"/>
		<span>
			<strong> The internet is changing.</strong>
			{{ liveDateAndTime.currentDate }}: An important update for readers in Germany.
		</span>
	</p>
	<p>
		<small>
			Thank you for visiting Wikipedia this {{ currentDayName }}, {{ currentDate }}.
			This year, Wikipedia has seen fewer visitors and fewer new supporters, so your visit today means a lot.
			You only had a small chance of seeing our message.
			We don't take your attention for granted, but today we're asking you to give €5 if you can.
		</small>
	</p>
	<p>
		<small>
			Like public libraries and food banks, we exist to serve everyone, not profit from your attention.
			That's why we don't run ads or put knowledge behind a paywall.
			Wikipedia's here to satisfy your curiosity and give you the facts you need.
		</small>
	</p>
	<p>
		<small>
			Wikipedia is free to use, but not free to provide.
			An unprecedented rise in hardware costs is making the essential equipment
			needed to keep Wikipedia available to everyone much more expensive.
			Your donation helps our nonprofit meet those costs while keeping Wikipedia free and independent.
			Please donate €5 today.
			Thank you.
		</small>
	</p>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';
import InfoIcon from '@src/components/Icons/InfoIconStraight.vue';
import { useLiveDateAndTime } from '@src/components/composables/useLiveDateAndTime';

const { currentDayName, currentDate, getCurrentDateAndTime } = inject<DynamicContent>( 'dynamicCampaignText' );
const { liveDateAndTime, startTimer, stopTimer } = useLiveDateAndTime( getCurrentDateAndTime );
onMounted( startTimer );
onUnmounted( stopTimer );

</script>
