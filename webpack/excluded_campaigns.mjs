import fg from 'fast-glob';
import path from 'path';
import { parse as parseTOML } from 'toml';
import { readFileSync } from 'fs';

/**
 * Get a list of campaign directories in 'banners/' that are not referenced in the current campaign_info.toml
 *
 * @param {string} campaignConfigPath
 * @return {string[]}
 */
export function getExcludedCampaignDirectories( campaignConfigPath ) {
	console.log( readFileSync( campaignConfigPath, 'utf-8' ) );
	const config = parseTOML( readFileSync( campaignConfigPath, 'utf-8' ) );
	const activeCampaigns = new Set();
	for ( const channelConfig of Object.values( config ) ) {
		activeCampaigns.add( channelConfig.campaign );
	}

	const bannerDirectories = fg.sync( 'banners/*/*', { onlyDirectories: true } );
	const excludedDirectories = [];
	for ( const currentDirectory of bannerDirectories ) {
		const campaignName = path.basename( currentDirectory );
		if ( activeCampaigns.has( campaignName ) || campaignName.includes( 'thankyou' ) ) {
			continue;
		}
		excludedDirectories.push( `${currentDirectory}/*` );
	}
	return excludedDirectories;
}
