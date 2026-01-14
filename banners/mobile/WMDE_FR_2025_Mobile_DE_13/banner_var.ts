import { createVueApp } from '@src/createVueApp';

import './styles/Variant/main.css';
import './styles/Variant/use-of-funds.scss';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import Banner from './components/BannerVar.vue';
import { UrlRuntimeEnvironment } from '@src/utils/RuntimeEnvironment';
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
import eventMappings from './event_map_var';
import messages from './messages_var';
import { LocaleFactoryDe } from '@src/utils/LocaleFactory/LocaleFactoryDe';
import { createFormItems } from './form_items_var';
import { createFormActions } from '@src/createFormActions';
import { LocalStorageCloseTracker } from '@src/utils/LocalCloseTracker';
import { WindowTimer } from '@src/utils/Timer';
import { currentCampaignTimePercentage } from '@src/components/ProgressBar/currentCampaignTimePercentage';

const localeFactory = new LocaleFactoryDe();
const translator = new Translator( messages );
const mediaWiki = new WindowMediaWiki();
const page = new PageWPORG( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker() );
const runtimeEnvironment = new UrlRuntimeEnvironment( window.location );
const impressionCount = new LocalImpressionCount( page.getTracking().keyword, runtimeEnvironment );
const tracker = new LegacyTrackerWPORG( mediaWiki, page.getTracking().keyword, eventMappings, runtimeEnvironment );
const date = new Date();
const currencyFormatter = localeFactory.getCurrencyFormatter();

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: runtimeEnvironment.getBannerDelay( 7500 ),
		transitionDuration: 1000
	},
	bannerCategory: 'fundraising',
	bannerProps: {
		useOfFundsContent: localeFactory.getUseOfFundsLoader().getContent(),
		pageScroller: new WindowPageScroller(),
		localCloseTracker: new LocalStorageCloseTracker()
	},
	resizeHandler: new WindowResizeHandler(),
	banner: Banner,
	impressionCount
} );

app.use( TranslationPlugin, translator );
app.use( DynamicTextPlugin, {
	campaignParameters: page.getCampaignParameters(),
	date,
	formatters: localeFactory.getFormatters(),
	impressionCount,
	translator
} );

app.provide( 'currencyFormatter', currencyFormatter );
app.provide( 'formItems', createFormItems( translator, currencyFormatter.euroAmount.bind( currencyFormatter ) ) );
app.provide( 'formActions', createFormActions( page.getTracking(), impressionCount ) );
app.provide( 'tracker', tracker );
app.provide( 'timer', new WindowTimer() );
app.provide( 'currentCampaignTimePercentage', currentCampaignTimePercentage( date, page.getCampaignParameters() ) );

app.mount( page.getBannerContainer() );
