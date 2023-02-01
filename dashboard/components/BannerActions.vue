<template>
	<p>
		<a :href="campaign.previewUrlDev.replace('{{banner}}', banner.pageName)" target="_blank">{{banner.pageName}}</a>
	</p>
</template>
<script setup lang="ts">
import type { Banner, Campaign } from '../../webpack/campaign_config_types';

defineProps<{banner: Banner, campaign: Campaign}>();
</script>
