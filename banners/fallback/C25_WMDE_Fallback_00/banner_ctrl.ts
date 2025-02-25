import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import Banner from './components/BannerCtrl.vue';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import TranslationPlugin from '@src/TranslationPlugin';
import DynamicTextPlugin from '@src/DynamicTextPlugin';
import PageWPORG from '@src/page/PageWPORG';
import { SkinFactory } from '@src/page/skin/SkinFactory';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';
import { WindowMediaWiki } from '@src/page/MediaWiki/WindowMediaWiki';
import { UrlRuntimeEnvironment } from '@src/utils/RuntimeEnvironment';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { Translator } from '@src/Translator';
import messages from './messages';
import { LocaleFactoryDe } from '@src/utils/LocaleFactory/LocaleFactoryDe';
import { WindowTimer } from '@src/utils/Timer';
import { LegacyTrackerWPORG } from '@src/tracking/LegacyTrackerWPORG';
import eventMappings from '../../desktop/C25_WMDE_Desktop_DE_00/event_map';
import { createFallbackDonationURL } from '@src/createFallbackDonationURL';
import { currentCampaignTimePercentage } from '@src/components/ProgressBar/currentCampaignTimePercentage';

const localeFactory = new LocaleFactoryDe();
const translator = new Translator( messages );
const mediaWiki = new WindowMediaWiki();
const page = new PageWPORG( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker() );
const runtimeEnvironment = new UrlRuntimeEnvironment( window.location );
const impressionCount = new LocalImpressionCount( page.getTracking().keyword, runtimeEnvironment );
const date = new Date();
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
		donationLink: createFallbackDonationURL( page.getTracking(), impressionCount )
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

app.provide( 'tracker', tracker );
app.provide( 'timer', new WindowTimer() );
app.provide( 'currentCampaignTimePercentage', currentCampaignTimePercentage( new Date(), page.getCampaignParameters() ) );

app.mount( page.getBannerContainer() );
