import { parse as parseTOML } from 'toml';
import { readFileSync } from 'fs';
import { campaignInfoToCampaignConfig } from '../../webpack/convert_info_to_type.js';
import chalk from 'chalk';
import CampaignName from './CampaignName.mjs';
import KeywordTrackingCode from './KeywordTrackingCode.mjs';
import CampaignTrackingCode from './CampaignTrackingCode.mjs';

const rawConfigForAllCampaigns = parseTOML( readFileSync( 'campaign_info.toml', 'utf-8' ) );
const configObject = campaignInfoToCampaignConfig( rawConfigForAllCampaigns );

for ( const channelConfig of Object.values( configObject ) ) {

	let campaignName = '';
	let campaignTracking = '';
	let ctrlTracking = '';
	let varTracking = '';
	try {
		campaignName = new CampaignName( channelConfig.campaign );
		campaignTracking = new CampaignTrackingCode( channelConfig.tracking );
		ctrlTracking = new KeywordTrackingCode( channelConfig.banners.ctrl.tracking );
		varTracking = new KeywordTrackingCode( channelConfig.banners.var.tracking );
	} catch ( error ) {
		console.warn( chalk.red( 'CAMPAIGN CONFIGURATION ERROR: ' ) + error.message );
		process.exit( 1 );
	}

	if ( campaignName.testNumber !== varTracking.testNumber ||
		campaignName.testNumber !== ctrlTracking.testNumber ||
		campaignName.testNumber !== campaignTracking.testNumber
	) {
		console.warn( `${ chalk.red( 'CAMPAIGN CONFIGURATION ERROR:' ) } Faulty test number for ${ channelConfig.campaign } ` );
		console.log( campaignName.testNumber );
		console.log( campaignTracking.testNumber );
		console.log( ctrlTracking.testNumber );
		console.log( varTracking.testNumber );
		process.exit( 1 );
	}
	if ( !ctrlTracking.matchesDate( varTracking ) || !ctrlTracking.matchesDate( campaignTracking ) ) {
		console.warn( `${ chalk.red( 'CAMPAIGN CONFIGURATION ERROR:' ) } Faulty start date for ${ channelConfig.campaign } ` );
		console.log( campaignTracking.startDate );
		console.log( ctrlTracking.startDate );
		console.log( varTracking.startDate );
		process.exit( 1 );
	}

}
