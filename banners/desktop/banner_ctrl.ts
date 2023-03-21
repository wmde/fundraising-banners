import { createVueApp } from '@src/createVueApp';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import MainBanner from './components/MainBanner.vue';
import getBannerDelay from '@src/utils/getBannerDelay';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import PageOrg from '@src/page/PageOrg';
import { WindowMediaWiki } from '@src/page/MediaWiki/WindowMediaWiki';
import { SkinFactory } from '@src/page/skin/SkinFactory';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';
import TranslationPlugin from '@src/TranslationPlugin';
// Change for EN banners
import Translations from '@src/messages/de';
import { Translator } from '@src/Translator';
import DynamicTextPlugin from '@src/DynamicTextPlugin';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import { OrdinalDe } from '@src/utils/DynamicContent/formatters/OrdinalDe';
import { CampaignParameters, CampaignProjectionParameters } from '@src/CampaignParameters';

const translator = new Translator( Translations );

// This is channel specific and must be changed for wp.de banners
const mediaWiki = new WindowMediaWiki();
const page = new PageOrg( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker() );

// This is language-specific and must be changed for EN banners
const formatters: Formatters = { currency: new CurrencyDe(), ordinal: new OrdinalDe() };

// TODO get from banner environment
const bannerName = 'testbanner';

// TODO get from banner environment (ideally the same on all channels with webpack alias override in dev env)
const campaignParameters: CampaignParameters = {
	campaignProjection: {
		averageAmountPerDonation: 0,
		baseDate: '2023-11-01',
		baseDonationSum: 0,
		donationAmountPerMinute: 5,
		donorsBase: 0,
		donorsPerMinute: 1,
		goalDonationSum: 9_000_000
	} as CampaignProjectionParameters,
	startDate: '2023-11-01',
	endDate: '2023-12-31',
	millionImpressionsPerDay: 0,
	numberOfMembers: 0
};

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: getBannerDelay( 7500 ),
		transitionDuration: 1000
	},
	resizeHandler: new WindowResizeHandler(),
	banner: MainBanner,
	bannerProps: {
		greeting: 'Hello'
	}
} );

app.use( TranslationPlugin, translator );
app.use( DynamicTextPlugin, {
	campaignParameters,
	date: new Date(),
	formatters,
	impressionCount: new LocalImpressionCount( bannerName ),
	translator
} );

app.mount( page.getBannerContainer() );
