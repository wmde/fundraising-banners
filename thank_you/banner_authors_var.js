// eslint-disable-next-line no-unused-vars
import style from './styles/styles_authors.pcss';

import { integerFormatter, millionFormatter } from '../shared/number_formatter/de';
import { createCampaignParameters } from '../shared/campaign_parameters';
import { showBanner } from './src/show_banner';
import { createTrackingData } from '../shared/tracking_data';
import { getTrackingIds } from '../shared/tracking_ids';
import { getSkinAdjuster } from '../shared/skin';

import Banner from './components/Banner';
import AuthorsMoreInfo from './components/AuthorsMoreInfo';

const bannerContainer = document.getElementById( 'WMDE-Banner-Container' );

const CampaignParameters = createCampaignParameters();
const trackingIds = getTrackingIds( bannerContainer );

showBanner(
	Banner,
	bannerContainer,
	{
		...trackingIds,
		numberOfDonors: integerFormatter( CampaignParameters.donationProjection.donorsBase ),
		goalDonationSum: millionFormatter( CampaignParameters.donationProjection.goalDonationSum / 1000000 ),
		trackingData: createTrackingData( trackingIds.bannerName ),
		expandText: 'Dankestext lesen',
		showSteps: false,
		moreInfo: AuthorsMoreInfo,
		skinFunctions: getSkinAdjuster()
	}
);
