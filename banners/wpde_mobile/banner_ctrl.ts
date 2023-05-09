import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import Banner from './components/BannerCtrl.vue';
import getBannerDelay from '@src/utils/getBannerDelay';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import PageWPDE from '@src/page/PageWPDE';
import TranslationPlugin from '@src/TranslationPlugin';
import { WindowPageScroller } from '@src/utils/PageScroller/WindowPageScroller';

// Channel specific form setup
import { createFormItems } from './form_items';
import { createFormActions } from '@src/createFormActions';
import { FormControllerCtrl } from './FormControllerCtrl';
import { useFormModel } from '@src/components/composables/useFormModel';
import { TrackerWPDE } from '@src/tracking/TrackerWPDE';
import supportedEvents from './supported_events';

import messages from './messages';
import { Translator } from '@src/Translator';
import DynamicTextPlugin from '@src/DynamicTextPlugin';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { LocaleFactoryWpDe } from '@src/utils/LocaleFactory/LocaleFactoryWpDe';

const localeFactory = new LocaleFactoryWpDe();
const useOfFundsContent = localeFactory.getUseOfFundsLoader().getContent();
const translator = new Translator( messages );

// Tracking placeholders will be replaced by webpack string-replace-loader
// using the campaign configuration ( campaign_info.toml ) for the correct values
const tracking = {
	campaign: '!insert-campaign-here!',
	keyword: '!insert-keyword-here!'
};

// This is channel specific and must be changed for wp.org banners
const page = new PageWPDE( tracking );

const impressionCount = new LocalImpressionCount( page.getTracking().keyword );
const tracker = new TrackerWPDE( 'FundraisingTracker', page.getTracking().keyword, supportedEvents );

const pageScroller = new WindowPageScroller();

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: getBannerDelay( 7500 ),
		transitionDuration: 1000
	},
	bannerProps: {
		formController: new FormControllerCtrl( useFormModel(), pageScroller ),
		useOfFundsContent,
		pageScroller
	},
	resizeHandler: new WindowResizeHandler(),
	banner: Banner,
	impressionCount,
	tracker
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
