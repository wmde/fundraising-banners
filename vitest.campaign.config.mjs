import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import chalk from 'chalk';
import { getFilterForInactiveCampaigns } from './test/filterInactiveCampaigns.mjs';
import defaultConfig from './vitest.config.mjs';

// Set to 'warn' to print a warning, set to 'error' to throw an error, or 'ignore' to do nothing
const CAMPAIGN_WITHOUT_TEST_HANDLING = 'error';

const { inactiveCampaignGlobs, campaignsWithoutTests } = getFilterForInactiveCampaigns( 'test/banners/*/*', 'campaign_info.toml' );

const outputMissingCampaigns = ( missingCampaigns ) => {
	missingCampaigns.forEach( c => console.log( `  ${c}` ) );
};

if ( campaignsWithoutTests.length > 0 ) {
	if ( CAMPAIGN_WITHOUT_TEST_HANDLING === 'warn' ) {
		console.warn( `${ chalk.yellow( 'Warning:' ) } Campaigns without tests:` );
		outputMissingCampaigns( campaignsWithoutTests );
	} else if ( CAMPAIGN_WITHOUT_TEST_HANDLING === 'error' ) {
		console.warn( `${ chalk.yellow( 'Error:' ) } Campaigns without tests:` );
		outputMissingCampaigns( campaignsWithoutTests );
		process.exit( 1 );
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
