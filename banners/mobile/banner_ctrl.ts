import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import Banner from './components/BannerCtrl.vue';
import getBannerDelay from '@src/utils/getBannerDelay';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import PageOrg from '@src/page/PageOrg';
import { WindowMediaWiki } from '@src/page/MediaWiki/WindowMediaWiki';
import { SkinFactory } from '@src/page/skin/SkinFactory';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';
import TranslationPlugin from '@src/TranslationPlugin';

// Channel specific form setup
import { createFormItems } from './form_items';
import { createFormActions } from '@src/createFormActions';
import { FormControllerCtrl } from './FormControllerCtrl';
import { useFormModel } from '@src/components/composables/useFormModel';

// Change for EN banners
import messages from './messages';
import { Translator } from '@src/Translator';
import DynamicTextPlugin from '@src/DynamicTextPlugin';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import { OrdinalDe } from '@src/utils/DynamicContent/formatters/OrdinalDe';
import { IntegerDe } from '@src/utils/DynamicContent/formatters/IntegerDe';
import { DeJSONFundsContentLoader } from '@src/utils/UseOfFunds/DeJSONFundsContentLoader';
import { WindowPageScroller } from '@src/utils/PageScroller/WindowPageScroller';

const useOfFundsContent = ( new DeJSONFundsContentLoader() ).getContent();

const translator = new Translator( messages );

// This is channel specific and must be changed for wp.de banners
const mediaWiki = new WindowMediaWiki();
const page = new PageOrg( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker() );

// This is language-specific and must be changed for EN banners
const currencyFormatter = new CurrencyDe();
const formatters: Formatters = { currency: currencyFormatter, ordinal: new OrdinalDe(), integer: new IntegerDe() };

const impressionCount = new LocalImpressionCount( page.getTracking().keyword );

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

app.mount( page.getBannerContainer() );
