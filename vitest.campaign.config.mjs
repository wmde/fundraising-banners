import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import { getFilterForInactiveCampaigns } from './test/filterInactiveCampaigns.mjs';
import defaultConfig from './vitest.config.mjs';

// Set to 'warn' to print a warning, set to 'error' to throw an error, or 'ignore' to do nothing
const CAMPAIGN_WITHOUT_TEST_HANDLING = 'warn';

const { inactiveCampaignGlobs, campaignsWithoutTests } = getFilterForInactiveCampaigns( 'test/banners/*/*', 'campaign_info.toml' );

if ( campaignsWithoutTests.length > 0 ) {
	if ( CAMPAIGN_WITHOUT_TEST_HANDLING === 'warn' ) {
		console.warn( 'Campaigns without tests:', campaignsWithoutTests );
	} else if ( CAMPAIGN_WITHOUT_TEST_HANDLING === 'error' ) {
		throw new Error( 'Campaigns without tests:', campaignsWithoutTests );
	}
}

export default mergeConfig( defaultConfig, defineConfig( {
	test: {
		exclude: [
			// It's important to preserve the defaults, otherwise vitest will be looking for tests
			// in the wrong places and choke on tests in node_modules
			...configDefaults.exclude,
			...inactiveCampaignGlobs
		]
	}
} ) );
