import { createVueApp } from '@src/createVueApp';

import './styles/OLD/styles_wporg.scss';

import PageWPORG from '@src/page/PageWPORG';
import { SkinFactory } from '@src/page/skin/SkinFactory';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';
import { Translator } from '@src/Translator';
import { WindowMediaWiki } from '@src/page/MediaWiki/WindowMediaWiki';
import { UrlRuntimeEnvironment } from '@src/utils/RuntimeEnvironment';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { LegacyTrackerWPORG } from '@src/tracking/LegacyTrackerWPORG';
import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import Banner from './components/BannerVar.en.vue';
import messages from './messages.en';
import eventMappings from './event_map';
import TranslationPlugin from '@src/TranslationPlugin';
import { createTrackedURL, MEMBERSHIP_FORM_URL, SUBSCRIBE_URL, USE_OF_FUNDS_URL } from './createTrackedURL';
import { createThankYouSettings } from './settings';
import { IntegerEn } from '@src/utils/DynamicContent/formatters/IntegerEn';
import { Locales } from '@src/domain/Locales';
import { WindowTimer } from '@src/utils/Timer';

const translator = new Translator( messages );
const mediaWiki = new WindowMediaWiki();
const page = new PageWPORG( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker( 0 ) );
const runtimeEnvironment = new UrlRuntimeEnvironment( window.location );
const impressionCount = new LocalImpressionCount( page.getTracking().keyword, runtimeEnvironment );
const tracker = new LegacyTrackerWPORG( mediaWiki, page.getTracking().keyword, eventMappings, runtimeEnvironment );

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: 0,
		transitionDuration: 0
	},
	bannerCategory: 'fundraisingThankyou',
	bannerProps: {
		settings: createThankYouSettings( new IntegerEn(), page.getThankYouCampaignParameters() ),
		subscribeURL: createTrackedURL( SUBSCRIBE_URL, page.getTracking(), impressionCount, { locale: Locales.EN } ),
		useOfFundsURL: createTrackedURL( USE_OF_FUNDS_URL, page.getTracking(), impressionCount, { locale: Locales.EN } ),
		membershipWithAmountURL: createTrackedURL( MEMBERSHIP_FORM_URL, page.getTracking(), impressionCount, {
			locale: Locales.EN,
			interval: '1',
			fee: '500',
			type: 'sustaining'
		} ),
		membershipWithoutAmountURL: createTrackedURL( MEMBERSHIP_FORM_URL, page.getTracking(), impressionCount, { locale: Locales.EN, type: 'sustaining' } )
	},
	resizeHandler: new WindowResizeHandler(),
	banner: Banner,
	impressionCount
} );

app.use( TranslationPlugin, translator );
app.provide( 'tracker', tracker );
app.provide( 'timer', new WindowTimer() );

app.mount( page.getBannerContainer() );
