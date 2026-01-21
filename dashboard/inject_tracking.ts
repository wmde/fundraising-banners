// Entry point for injecting tracking data for currently shown banner in the development environment.
// In a compiled banner, the tracking data is baked into the data attribute of the container div.

import type { CampaignConfig } from '../webpack/campaign_config_types';

declare var CAMPAIGNS: CampaignConfig;

function getTrackingForPage( pageName: string, config: CampaignConfig ): { campaign: string, keyword: string } {
	for ( const campaignId in config ) {
		for ( const bannerId in config[ campaignId ].banners ) {
			if ( config[ campaignId ].banners[ bannerId ].pageName === pageName ) {
				return {
					campaign: config[ campaignId ].tracking,
					keyword: config[ campaignId ].banners[ bannerId ].tracking
				};
			}
		}
	}
	console.log( `pagename #{pageName} not found in campaign configuration, please check` );
	return { campaign: 'UNKNOWN_CAMPAIGN', keyword: 'UNKNOWN_KEYWORD' };

}

function injectTracking(): void {
	const currentUrl = new URL( window.location.href );
	const currentBanner = currentUrl.searchParams.get( 'devbanner' );
	const { campaign, keyword } = getTrackingForPage( currentBanner, CAMPAIGNS );

	const container = document.getElementById( 'WMDE-Banner-Container' );
	container.dataset.tracking = keyword;
	container.dataset.campaignTracking = campaign;
}

injectTracking();
