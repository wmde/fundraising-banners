<template>
	<div>
		<div v-for="campaign in campaigns" :key="campaign.name">
			<h2>{{campaign.name}}</h2>
			<ul>
				<li><BannerActions :campaign=campaign :banner="campaign.banners.ctrl" /></li>
				<li v-if="campaign.banners.var"><BannerActions :campaign=campaign :banner="campaign.banners.var" /></li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { CampaignConfig } from '../../webpack/campaign_config_types';

import BannerActions from './BannerActions.vue';

defineProps<{campaigns: CampaignConfig, gitBranch: string}>();

</script>
