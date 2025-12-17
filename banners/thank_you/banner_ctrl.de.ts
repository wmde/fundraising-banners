import { createVueApp } from '@src/createVueApp';

import './styles/main.css';

import PageWPORG from '@src/page/PageWPORG';
import { SkinFactory } from '@src/page/skin/SkinFactory';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';
import { WindowMediaWiki } from '@src/page/MediaWiki/WindowMediaWiki';
import { UrlRuntimeEnvironment } from '@src/utils/RuntimeEnvironment';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import { LegacyTrackerWPORG } from '@src/tracking/LegacyTrackerWPORG';
import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import Banner from './components/BannerCtrl.vue';
import eventMappings from './event_map';
import { createTrackedURL, MEMBERSHIP_FORM_URL, SUBSCRIBE_URL, USE_OF_FUNDS_URL } from './createTrackedURL';
import { Locales } from '@src/domain/Locales';
import { WindowTimer } from '@src/utils/Timer';
import { ThankYouContentFactoryDe } from '@src/utils/ThankYou/Factories/ThankYouContentFactoryDe';

const mediaWiki = new WindowMediaWiki();
const page = new PageWPORG( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker( 0 ) );
const runtimeEnvironment = new UrlRuntimeEnvironment( window.location );
const impressionCount = new LocalImpressionCount( page.getTracking().keyword, runtimeEnvironment );
const tracker = new LegacyTrackerWPORG( mediaWiki, page.getTracking().keyword, eventMappings, runtimeEnvironment );
const thankYouContentFactory = new ThankYouContentFactoryDe();

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: 0,
		transitionDuration: 0
	},
	bannerCategory: 'fundraisingThankyou',
	bannerProps: {
		thankYouContent: thankYouContentFactory.getThankYouContentLoader().getContent(),
		subscribeURL: createTrackedURL( SUBSCRIBE_URL, page.getTracking(), impressionCount, { locale: Locales.DE } ),
		useOfFundsURL: createTrackedURL( USE_OF_FUNDS_URL, page.getTracking(), impressionCount, { locale: Locales.DE } ),
		membershipWithAmountURL: createTrackedURL( MEMBERSHIP_FORM_URL, page.getTracking(), impressionCount, {
			locale: Locales.DE,
			interval: '1',
			fee: '500',
			type: 'sustaining',
			mf: '0'
		} ),
		membershipWithoutAmountURL: createTrackedURL( MEMBERSHIP_FORM_URL, page.getTracking(), impressionCount, {
			locale: Locales.DE,
			type: 'sustaining',
			mf: '0'
		} )
	},
	resizeHandler: new WindowResizeHandler(),
	banner: Banner,
	impressionCount
} );

app.provide( 'tracker', tracker );
app.provide( 'timer', new WindowTimer() );

app.mount( page.getBannerContainer() );
