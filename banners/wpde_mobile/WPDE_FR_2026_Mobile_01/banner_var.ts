import { createVueApp } from '@src/createVueApp';

import './styles_var/styles.css';
import './styles_var/use-of-funds.scss';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import Banner from './components_var/BannerCtrl.vue';
import { UrlRuntimeEnvironment } from '@src/utils/RuntimeEnvironment';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import PageWPDE from '@src/page/PageWPDE';
import TranslationPlugin from '@src/TranslationPlugin';
import { Translator } from '@src/Translator';
import DynamicTextPlugin from '@src/DynamicTextPlugin';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { WindowPageScroller } from '@src/utils/PageScroller/WindowPageScroller';
import { TrackerWPDE } from '@src/tracking/TrackerWPDE';
import eventMap from './event_map';
import messages from './messages_var';
import { LocaleFactoryWpDe } from '@src/utils/LocaleFactory/LocaleFactoryWpDe';
import { createFormItems } from './form_items_var';
import { createFormActions } from '@src/createFormActions';
import { WindowTimer } from '@src/utils/Timer';
import { currentCampaignTimePercentage } from '@src/components/ProgressBar/currentCampaignTimePercentage';

const localeFactory = new LocaleFactoryWpDe();
const translator = new Translator( messages );

// Tracking placeholders will be replaced by webpack string-replace-loader
// using the campaign configuration ( campaign_info.toml ) for the correct values
const tracking = {
	campaign: '!insert-campaign-here!',
	keyword: '!insert-keyword-here!'
};

const page = new PageWPDE( tracking );
const runtimeEnvironment = new UrlRuntimeEnvironment( window.location );
const impressionCount = new LocalImpressionCount( page.getTracking().keyword, runtimeEnvironment );
const tracker = new TrackerWPDE( 'FundraisingTracker', page.getTracking().keyword, eventMap, runtimeEnvironment );
const date = new Date();
const currencyFormatter = localeFactory.getCurrencyFormatter();

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: runtimeEnvironment.getBannerDelay( 0 ),
		transitionDuration: 1000
	},
	bannerCategory: 'fundraising',
	bannerProps: {
		useOfFundsContent: localeFactory.getUseOfFundsLoader().getContent(),
		pageScroller: new WindowPageScroller(),
		remainingImpressions: impressionCount.getRemainingImpressions( page.getMaxBannerImpressions() )
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
