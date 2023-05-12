const BannerConfigMap = {
	pageName: 'pagename',
	fileName: 'filename',
	tracking: 'tracking'
};

const CamapignConfigMap = {
	name: 'name',
	description: 'description',
	icon: 'icon',
	tracking: 'campaign_tracking',
	previewUrlDev: 'preview_link',
	previewUrlProd: 'preview_url',
	wrapperTemplate: 'wrapper_template'
};

function mapObjectWithNewKeys( sourceObj, keyMap ) {
	const newObj = {};
	Object.entries( keyMap ).forEach( ( [ newKey, sourceKey ] ) => {
		if ( sourceKey in sourceObj ) {
			newObj[ newKey ] = sourceObj[ sourceKey ];
		}
	} );
	return newObj;
}

function campaignInfoToCampaignConfig( campaignInfo ) {
	const config = {};
	Object.entries( campaignInfo ).forEach( ( [ campaignName, campaign ] ) => {

		config[ campaignName ] = mapObjectWithNewKeys( campaign, CamapignConfigMap );
		if ( !config[ campaignName ].name ) {
			config[ campaignName ].name = campaignName;
		}

		const banners = {};
		Object.entries( campaign.banners ).forEach( ( [ bannerName, banner ] ) => {
			banners[ bannerName ] = mapObjectWithNewKeys( banner, BannerConfigMap );
		} );
		config[ campaignName ].banners = banners;
	} );
	return config;
}

module.exports = {
	campaignInfoToCampaignConfig
};
