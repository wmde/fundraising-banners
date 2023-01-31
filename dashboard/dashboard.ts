import { createApp } from 'vue';
import DevDashboard from './DevDashboard.vue';

import type { CampaignConfig } from './campaign_config_types';

declare var CAMPAIGNS: CampaignConfig;
declare var GIT_BRANCH: string;

createApp(
	DevDashboard,
	// global variables injected by webpack DefinePlugin, see webpack.config.js
	{
		// eslint-disable-next-line no-undef
		campaigns: CAMPAIGNS,
		// eslint-disable-next-line no-undef
		gitBranch: GIT_BRANCH 
	}
).mount("#dashboard");
