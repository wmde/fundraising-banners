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
import { createFormItems } from './form_items';
import { FormActionParameters } from '@src/domain/FormActionParameters';

const translator = new Translator( Translations );

// This is channel specific and must be changed for wp.de banners
const mediaWiki = new WindowMediaWiki();
const page = new PageOrg( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker() );

// This is language-specific and must be changed for EN banners
const currencyFormatter = new CurrencyDe();
const formatters: Formatters = { currency: currencyFormatter, ordinal: new OrdinalDe() };

const impressionCount = new LocalImpressionCount( page.getTracking().keyword );

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
	},
	impressionCount
} );

app.use( TranslationPlugin, translator );
app.use( DynamicTextPlugin, {
	campaignParameters: page.getCampaignParameters(),
	date: new Date(),
	formatters,
	impressionCount,
	translator
} );

const formActionParameters: FormActionParameters = {
	bannerImpressionCount: String( impressionCount.bannerCount ),
	bannerName: page.getTracking().keyword,
	campaignName: page.getTracking().campaign,
	overallImpressionCount: String( impressionCount.overallCount )
};

app.provide( 'currencyFormatter', currencyFormatter.customAmountInput.bind( currencyFormatter ) );
app.provide( 'formItems', createFormItems( translator, currencyFormatter.amountInput.bind( currencyFormatter ) ) );
app.provide( 'formActionParameters', formActionParameters );

app.mount( page.getBannerContainer() );
