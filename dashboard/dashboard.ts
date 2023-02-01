import { createApp } from 'vue';
import DevDashboard from './components/DevDashboard.vue';

import type { CampaignConfig } from '../webpack/campaign_config_types';

// global variables injected by webpack DefinePlugin, see webpack.config.js
// CAMPAIGNS might not really conform to CampaignConfig- if the campaign_info.toml file contains bogus data, you will get errors further down
// eslint-disable-next-line no-var
declare var CAMPAIGNS: CampaignConfig;
// eslint-disable-next-line no-var
declare var GIT_BRANCH: string;

createApp(
	DevDashboard,
	{
		campaigns: CAMPAIGNS,
		gitBranch: GIT_BRANCH
	}
).mount( '#dashboard' );
