import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';

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
import eventMappings from './event_map';
import { createFallbackDonationURL } from '@src/createFallbackDonationURL';
import messages from './messages';
import { LocaleFactoryDe } from '@src/utils/LocaleFactory/LocaleFactoryDe';
import { createFormItems } from './form_items';
import { createFormActions } from '@src/createFormActions';
import { currentCampaignTimePercentage } from './currentCampaignTimePercentage';
import { WindowTimer } from '@src/utils/Timer';

const date = new Date();
const localeFactory = new LocaleFactoryDe();
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
		remainingImpressions: impressionCount.getRemainingImpressions( page.getMaxBannerImpressions( 'desktop' ) ),
		donationLink: createFallbackDonationURL( page.getTracking(), impressionCount )
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
	date,
	formatters: localeFactory.getFormatters(),
	impressionCount,
	translator,
	urgencyMessageDaysLeft: 45
} );

const currencyFormatter = localeFactory.getCurrencyFormatter();

app.provide( 'currencyFormatter', currencyFormatter );
app.provide( 'formItems', createFormItems( translator, currencyFormatter.euroAmount.bind( currencyFormatter ) ) );
app.provide( 'formActions', createFormActions( page.getTracking(), impressionCount ) );
app.provide( 'tracker', tracker );
app.provide( 'currentCampaignTimePercentage', currentCampaignTimePercentage( date, page.getCampaignParameters() ) );
app.provide( 'timer', new WindowTimer() );

app.mount( page.getBannerContainer() );
