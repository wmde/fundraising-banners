// eslint-disable-next-line no-unused-vars
import style from './styles/styles_var.pcss';

import * as formatters from '../shared/number_formatter/en';
import { createCampaignParameters } from '../shared/campaign_parameters';
import { createTrackingData } from '../shared/tracking_data';
import { getTrackingIds } from '../shared/tracking_ids';
import BannerPresenter from '../shared/banner_presenter';
import Translations from '../shared/messages/en';
import useOfFundsText from '../node_modules/fundraising-frontend-content/i18n/en_US/data/use_of_funds_content.json';

import Banner from './Banner';
import Slides from './components/Slides';
import BannerText from './components/BannerText';
import DonationForm from './components/ui/form/DonationFormWithHeaders_var';

import { createCampaignProjection } from '../shared/campaign_projection';
import { createFormItems } from './form_items_var';
import { LocalImpressionCount } from '../shared/local_impression_count';

const bannerContainer = document.getElementById( 'WMDE-Banner-Container' );
const campaignParameters = createCampaignParameters();
const campaignProjection = createCampaignProjection( campaignParameters );
const trackingIds = getTrackingIds( bannerContainer );
const trackingData = createTrackingData( trackingIds.bannerName );
const bannerPresenter = new BannerPresenter(
	trackingData,
	bannerContainer.dataset.delay || 5000,
	new LocalImpressionCount( trackingIds.bannerName )
);

bannerPresenter.present(
	Banner,
	bannerContainer,
	{
		...trackingIds,
		campaignParameters,
		campaignProjection,
		formatters,
		useOfFundsText,
		bannerText: BannerText,
		slides: Slides,
		donationForm: DonationForm,
		sliderAutoPlaySpeed: 5000,
		translations: Translations,
		formItems: createFormItems( Translations, formatters.amountInputFormatter )
	},
	0
);
