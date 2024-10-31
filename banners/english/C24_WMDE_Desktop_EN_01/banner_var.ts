import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';

import BannerConductor from '@src/components/BannerConductor/FallbackBannerConductor.vue';
import Banner from './components/BannerCtrl.vue';
import FallbackBanner from './components/FallbackBanner.vue';
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
import { LegacyTrackerWPORG } from '@src/tracking/LegacyTrackerWPORG';
import { Locales } from '@src/domain/Locales';

// Locale-specific imports
import messages from './messages';
import { LocaleFactoryEn } from '@src/utils/LocaleFactory/LocaleFactoryEn';

// Channel specific form setup
import { createFormItems } from './form_items';
import { createFormActions } from '@src/createFormActions';
import eventMappings from './event_map';
import { createFallbackDonationURL } from '@src/createFallbackDonationURL';
import { WindowTimer } from '@src/utils/Timer';

const localeFactory = new LocaleFactoryEn();
const translator = new Translator( messages );
const mediaWiki = new WindowMediaWiki();
const page = new PageWPORG( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker( 400 ) );
const runtimeEnvironment = new UrlRuntimeEnvironment( window.location );
const impressionCount = new LocalImpressionCount( page.getTracking().keyword, runtimeEnvironment );
const tracker = new LegacyTrackerWPORG( mediaWiki, page.getTracking().keyword, eventMappings, runtimeEnvironment );

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: runtimeEnvironment.getBannerDelay( 7500 ),
		transitionDuration: 1000
	},
	bannerProps: {
		useOfFundsContent: localeFactory.getUseOfFundsLoader().getContent(),
		remainingImpressions: impressionCount.getRemainingImpressions( page.getMaxBannerImpressions( 'english' ) ),
		donationLink: createFallbackDonationURL( page.getTracking(), impressionCount, { locale: Locales.EN } )
	},
	resizeHandler: new WindowResizeHandler(),
	banner: Banner,
	fallbackBanner: FallbackBanner,
	minWidthForMainBanner: 800,
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
app.provide( 'formActions', createFormActions( page.getTracking(), impressionCount, { locale: Locales.EN, ap: '1' } ) );
app.provide( 'tracker', tracker );
app.provide( 'timer', new WindowTimer() );

app.mount( page.getBannerContainer() );
