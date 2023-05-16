import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import Banner from './components/BannerCtrl.vue';
import getBannerDelay from '@src/utils/getBannerDelay';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import PageWPORG from '@src/page/PageWPORG';
import { WindowMediaWiki } from '@src/page/MediaWiki/WindowMediaWiki';
import { SkinFactory } from '@src/page/skin/SkinFactory';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';
import TranslationPlugin from '@src/TranslationPlugin';
import { LegacyTrackerWPORG } from '@src/tracking/LegacyTrackerWPORG';
import eventMappings from './event_map';

// Channel specific form setup
import { createFormItems } from './form_items';
import { createFormActions } from '@src/createFormActions';

// Change for EN banners
import messages from './messages';
import { Translator } from '@src/Translator';
import DynamicTextPlugin from '@src/DynamicTextPlugin';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { DeJSONFundsContentLoader } from '@src/utils/UseOfFunds/DeJSONFundsContentLoader';
import { WindowPageScroller } from '@src/utils/PageScroller/WindowPageScroller';
import { OrdinalEn } from '@src/utils/DynamicContent/formatters/OrdinalEn';
import { IntegerEn } from '@src/utils/DynamicContent/formatters/IntegerEn';
import { CurrencyEn } from '@src/utils/DynamicContent/formatters/CurrencyEn';

const useOfFundsContent = ( new DeJSONFundsContentLoader() ).getContent();

const translator = new Translator( messages );

// This is channel specific and must be changed for wp.de banners
const mediaWiki = new WindowMediaWiki();
const page = new PageWPORG( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker() );
const tracker = new LegacyTrackerWPORG( mediaWiki, page.getTracking().keyword, eventMappings );

// This is language-specific and must be changed for EN banners
const currencyFormatter = new CurrencyEn();
const formatters: Formatters = { currency: currencyFormatter, ordinal: new OrdinalEn(), integer: new IntegerEn() };

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
	formatters,
	impressionCount,
	translator
} );

app.provide( 'currencyFormatter', currencyFormatter );
app.provide( 'formItems', createFormItems( translator, currencyFormatter.euroAmount.bind( currencyFormatter ) ) );
app.provide( 'formActions', createFormActions( page.getTracking(), impressionCount ) );
app.provide( 'tracker', tracker );

app.mount( page.getBannerContainer() );
