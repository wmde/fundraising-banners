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
		console.warn( `${ chalk.red( 'CAMPAIGN CONFIGURATION ERROR:' ) } Mismatched test numbers for ${ channelConfig.campaign } ` );
		console.log( `Campaign test number:             ${campaignName.testNumber}` );
		console.log( `Campaign tracking test number:    ${campaignTracking.testNumber}` );
		console.log( `CTRL banner tracking test number: ${ctrlTracking.testNumber}` );
		console.log( `VAR banner tracking test number:  ${varTracking.testNumber}` );
		process.exit( 1 );
	}
	if ( !ctrlTracking.matchesDate( varTracking ) || !ctrlTracking.matchesDate( campaignTracking ) ) {
		console.warn( `${ chalk.red( 'CAMPAIGN CONFIGURATION ERROR:' ) } Mismatched start dates in tracking codes for ${ channelConfig.campaign } ` );
		console.log( `Campaign:    ${campaignTracking.startDate}` );
		console.log( `CTRL banner: ${ctrlTracking.startDate}` );
		console.log( `VAR banner:  ${varTracking.startDate}` );
		process.exit( 1 );
	}

}
