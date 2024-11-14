import { parse as parseTOML } from 'toml';
import { readFileSync } from 'fs';
import { campaignInfoToCampaignConfig } from '../webpack/convert_info_to_type.js';
import chalk from 'chalk';

const rawConfigForAllCampaigns = parseTOML( readFileSync( 'campaign_info.toml', 'utf-8' ) );
const configObject = campaignInfoToCampaignConfig( rawConfigForAllCampaigns );

for ( const channelConfig of Object.values( configObject ) ) {

	// check test number
	let testNumber = '';
	const testNumberMatchResult = channelConfig.campaign.match( /_\d{2}/ );
	if ( testNumberMatchResult === null ) {
		console.warn( `${ chalk.red( 'CAMPAIGN CONFIGURATION ERROR:' ) } Cannot parse test number ( "_dd" format) for ${ channelConfig.campaign } ` );
		process.exit( 1 );
	}
	testNumber = testNumberMatchResult[ 0 ];
	const testNumberSearchString = testNumber.slice( 1 ) + '-';
	if ( !channelConfig.tracking.includes( testNumberSearchString ) ||
		!channelConfig.banners.ctrl.tracking.includes( testNumberSearchString ) ||
		!channelConfig.banners.var.tracking.includes( testNumberSearchString ) ) {
		console.warn( `${ chalk.red( 'CAMPAIGN CONFIGURATION ERROR:' ) } Faulty tracking config (test number) for ${ channelConfig.campaign } ` );
		process.exit( 1 );
	}

	// check start date
	let startDate = '';
	const startDateMatchResult = channelConfig.tracking.match( /-\d{6}$/ );
	if ( startDateMatchResult === null ) {
		console.warn( `${ chalk.red( 'CAMPAIGN CONFIGURATION ERROR:' ) } Cannot parse 6-digit start date for ${ channelConfig.campaign } ` );
		process.exit( 1 );
	}
	startDate = startDateMatchResult[ 0 ];
	if ( !channelConfig.tracking.includes( startDate ) ||
		!channelConfig.banners.ctrl.tracking.includes( startDate ) ||
		!channelConfig.banners.var.tracking.includes( startDate ) ) {
		console.warn( `${ chalk.red( 'CAMPAIGN CONFIGURATION ERROR:' ) } Faulty tracking config (start date) for ${ channelConfig.campaign } ` );
		process.exit( 1 );
	}
}
