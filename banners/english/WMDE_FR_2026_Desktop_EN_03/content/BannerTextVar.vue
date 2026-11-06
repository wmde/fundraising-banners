<template>
	<p>
		<small>
			Thank you for visiting Wikipedia this {{ currentDayName }}, {{ currentDate }}.
			This year, Wikipedia has seen fewer visitors and fewer new readers, so your visit today means a lot.
			We don't take your attention for granted, but today we're asking you to give €5 if you can.
			Like public libraries, we exist to serve everyone, not profit from your attention.
			That's why we don't run ads or put knowledge behind a paywall.
			Wikipedia's here to satisfy your curiosity and give you the facts you need.
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
import { inject } from 'vue';
import type { DynamicContent } from '@src/utils/DynamicContent/DynamicContent';

const { currentDayName, currentDate } = inject<DynamicContent>( 'dynamicCampaignText' );

</script>
