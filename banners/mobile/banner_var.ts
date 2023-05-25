import { createVueApp } from '@src/createVueApp';

import './styles/styles_var.scss';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import Banner from './components/BannerVar.vue';
import getBannerDelay from '@src/utils/getBannerDelay';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import PageWPORG from '@src/page/PageWPORG';
import { WindowMediaWiki } from '@src/page/MediaWiki/WindowMediaWiki';
import { SkinFactory } from '@src/page/skin/SkinFactory';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';
import TranslationPlugin from '@src/TranslationPlugin';
import { Translator } from '@src/Translator';
import DynamicTextPlugin from '@src/DynamicTextPlugin';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { WindowPageScroller } from '@src/utils/PageScroller/WindowPageScroller';
import { LegacyTrackerWPORG } from '@src/tracking/LegacyTrackerWPORG';
import eventMappings from './event_map';

// Locale-specific imports
import messages from './messages';
import { LocaleFactoryDe } from '@src/utils/LocaleFactory/LocaleFactoryDe';

// Channel specific form setup
import { createFormItems } from './form_items_var';
import { createFormActions } from '@src/createFormActions';

const localeFactory = new LocaleFactoryDe();
const useOfFundsContent = localeFactory.getUseOfFundsLoader().getContent();

const translator = new Translator( messages );

// This is channel specific and must be changed for wp.de banners
const mediaWiki = new WindowMediaWiki();
const page = new PageWPORG( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker() );
const tracker = new LegacyTrackerWPORG( mediaWiki, page.getTracking().keyword, eventMappings );

const impressionCount = new LocalImpressionCount( page.getTracking().keyword );

const pageScroller = new WindowPageScroller();

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: getBannerDelay( 7500 ),
		transitionDuration: 1000
	},
	bannerProps: {
		useOfFundsContent,
		pageScroller
	},
	resizeHandler: new WindowResizeHandler(),
	banner: Banner,
	impressionCount
} );

app.use( TranslationPlugin, translator );
app.use( DynamicTextPlugin, {
	campaignParameters: page.getCampaignParameters(),
	date: new Date(),
	formatters: localeFactory.getFormatters(),
	impressionCount,
	translator
} );
const currencyFormatter = localeFactory.getCurrencyFormatter();

app.provide( 'currencyFormatter', currencyFormatter );
app.provide( 'formItems', createFormItems( translator, currencyFormatter.euroAmount.bind( currencyFormatter ) ) );
app.provide( 'formActions', createFormActions( page.getTracking(), impressionCount ) );
app.provide( 'tracker', tracker );

app.mount( page.getBannerContainer() );
