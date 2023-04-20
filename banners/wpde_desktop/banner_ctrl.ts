import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import Banner from './components/BannerWrapper.vue';
import getBannerDelay from '@src/utils/getBannerDelay';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import PageDe from '@src/page/PageDe';
import TranslationPlugin from '@src/TranslationPlugin';

// Channel specific form setup
import { createFormItems } from './form_items';
import { createFormActions } from '@src/createFormActions';
import { FormControllerCtrl } from './FormControllerCtrl';
import { useFormModel } from '@src/components/composables/useFormModel';
import DonationForm from '@src/components/DonationForm/Forms/MainDonationForm.vue';
import UpgradeToYearlyForm from '@src/components/DonationForm/Forms/UpgradeToYearlyForm.vue';
import CustomAmountForm from '@src/components/DonationForm/Forms/CustomAmountForm.vue';

// Change for EN banners
import messages from './messages';
import { Translator } from '@src/Translator';
import DynamicTextPlugin from '@src/DynamicTextPlugin';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { Formatters } from '@src/utils/DynamicContent/Formatters';
import { CurrencyDe } from '@src/utils/DynamicContent/formatters/CurrencyDe';
import { OrdinalDe } from '@src/utils/DynamicContent/formatters/OrdinalDe';
import { IntegerDe } from '@src/utils/DynamicContent/formatters/IntegerDe';
// TODO on Wikipedia.de we want to load the json from the banner server (or at least try that)
import { DeJSONFundsContentLoader } from '@src/utils/UseOfFunds/DeJSONFundsContentLoader';

const useOfFundsContent = ( new DeJSONFundsContentLoader() ).getContent();
const translator = new Translator( messages );

// Tracking placeholders will be replaced by webpack string-replace-loader
// using the campaign configuration ( campaign_info.toml ) for the correct values
const tracking = {
	campaign: '!insert-campaign-here!',
	keyword: '!insert-keyword-here!'
};

// This is channel specific and must be changed for wp.org banners
const page = new PageDe( tracking );

// This is language-specific and must be changed for EN banners
const currencyFormatter = new CurrencyDe();
const formatters: Formatters = { currency: currencyFormatter, ordinal: new OrdinalDe(), integer: new IntegerDe() };

const impressionCount = new LocalImpressionCount( page.getTracking().keyword );

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: getBannerDelay( 7500 ),
		transitionDuration: 1000
	},
	bannerProps: {
		formController: new FormControllerCtrl( useFormModel() ),
		forms: [ DonationForm, UpgradeToYearlyForm, CustomAmountForm ],
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
	formatters,
	impressionCount,
	translator
} );

app.provide( 'currencyFormatter', currencyFormatter );
app.provide( 'formItems', createFormItems( translator, currencyFormatter.euroAmount.bind( currencyFormatter ) ) );
app.provide( 'formActions', createFormActions( page.getTracking(), impressionCount ) );

app.mount( page.getBannerContainer() );
