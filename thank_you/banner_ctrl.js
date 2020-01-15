// eslint-disable-next-line no-unused-vars
import style from './styles/styles_ctrl.pcss';

import { donorFormatter, millionFormatter } from './src/formatters';
import { createCampaignParameters } from '../shared/campaign_parameters';
import { getTrackingData } from './src/tracking_data';
import { getTrackingIds } from './src/tracking_ids';
import { getSkin } from '../shared/skin';

import Banner from './banners/Banner';
import MembershipMoreInfo from './components/MembershipMoreInfo';
import { createElement, render } from 'preact';

const bannerContainer = document.getElementById( 'WMDE-Banner-Container' );

const CampaignParameters = createCampaignParameters();
const trackingIds = getTrackingIds( bannerContainer );
const skinFunctions = getSkin();

skinFunctions.moveBannerContainerToTopOfDom();

render(
	createElement( Banner, {
		...trackingIds,
		numberOfDonors: donorFormatter( CampaignParameters.donationProjection.donorsBase ),
		numberOfMembers: donorFormatter( CampaignParameters.numberOfMembers ),
		goalDonationSum: millionFormatter( CampaignParameters.donationProjection.goalDonationSum / 1000000 ),
		trackingData: getTrackingData( trackingIds.bannerName ),
		expandText: 'Dankestext lesen',
		moreInfo: MembershipMoreInfo,
		skinFunctions,
		onClose: () => {
			skinFunctions.removeSpace();
		}
	} ),
	bannerContainer
);

skinFunctions.addSpaceInstantly( bannerContainer.getElementsByClassName( 'wmde-banner' ).item( 0 ).offsetHeight );