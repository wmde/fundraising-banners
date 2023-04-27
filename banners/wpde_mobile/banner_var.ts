import { createVueApp } from '@src/createVueApp';

import './styles/styles_var.scss';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import Banner from './components/BannerVar.vue';
import getBannerDelay from '@src/utils/getBannerDelay';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import PageDe from '@src/page/PageDe';
import TranslationPlugin from '@src/TranslationPlugin';

// Channel specific form setup
import { createFormItems } from './form_items';
import { createFormActions } from '@src/createFormActions';
import { FormControllerCtrl } from './FormControllerCtrl';
import { useFormModel } from '@src/components/composables/useFormModel';

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
const page = new PageDe( tracking );

const impressionCount = new LocalImpressionCount( page.getTracking().keyword );

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: getBannerDelay( 7500 ),
		transitionDuration: 1000
	},
	bannerProps: {
		formController: new FormControllerCtrl( useFormModel() ),
		useOfFundsContent
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

app.mount( page.getBannerContainer() );
