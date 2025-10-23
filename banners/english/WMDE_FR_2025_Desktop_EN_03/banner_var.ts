import { createVueApp } from '@src/createVueApp';

import './styles/styles_var.scss';

import BannerConductor from '@src/components/BannerConductor/FallbackBannerConductor.vue';
import Banner from './components/BannerVar.vue';
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
import messages from './messages';
import { LocalStorageCloseTracker } from '@src/utils/LocalCloseTracker';
import { LocaleFactoryEn } from '@src/utils/LocaleFactory/LocaleFactoryEn';
import { createFormItems } from './form_items';
import { createFormActions } from '@src/createFormActions';
import eventMappings from './event_map';
import { createFallbackDonationURL } from '@src/createFallbackDonationURL';
import { WindowTimer } from '@src/utils/Timer';
import { currentCampaignTimePercentage } from '@src/components/ProgressBar/currentCampaignTimePercentage';

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
	bannerCategory: 'fundraising',
	bannerProps: {
		useOfFundsContent: localeFactory.getUseOfFundsLoader().getContent(),
		remainingImpressions: impressionCount.getRemainingImpressions( page.getMaxBannerImpressions( 'english' ) ),
		localCloseTracker: new LocalStorageCloseTracker(),
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
app.provide( 'formActions', createFormActions( page.getTracking(), impressionCount, { locale: Locales.EN } ) );
app.provide( 'tracker', tracker );
app.provide( 'timer', new WindowTimer() );
app.provide( 'currentCampaignTimePercentage', currentCampaignTimePercentage( new Date(), page.getCampaignParameters() ) );

app.mount( page.getBannerContainer() );
