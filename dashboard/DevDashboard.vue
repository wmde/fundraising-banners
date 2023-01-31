<template>
	<div>
		<div v-for="campaign in campaigns" :key="campaign.name">
			<h2>{{campaign.name}}</h2>
			<ul>
				<li><BannerActions :campaign=campaign :banner="campaign.banners.ctrl" /></li>
				<li><BannerActions :campaign=campaign :banner="campaign.banners.var" /></li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import BannerActions from './BannerActions.vue';
import type { CampaignConfig } from './campaign_config_types';


defineProps<{campaigns: CampaignConfig, gitBranch: string}>();

</script>
