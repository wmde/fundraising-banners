import { createVueApp } from '@src/createVueApp';

import './styles/main.css';

import { UrlRuntimeEnvironment } from '@src/utils/RuntimeEnvironment';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import Banner from './components/BannerCtrl.vue';
import { createTrackedURL, MEMBERSHIP_FORM_URL, SUBSCRIBE_URL, USE_OF_FUNDS_URL } from './createTrackedURL';
import PageWPDE from '@src/page/PageWPDE';
import { TrackerWPDE } from '@src/tracking/TrackerWPDE';
import eventMap from './event_map.wpde';
import { Locales } from '@src/domain/Locales';
import { WindowTimer } from '@src/utils/Timer';

// Tracking placeholders will be replaced by webpack string-replace-loader
// using the campaign configuration ( campaign_info.toml ) for the correct values
const tracking = {
	campaign: '!insert-campaign-here!',
	keyword: '!insert-keyword-here!'
};

const page = new PageWPDE( tracking );
const runtimeEnvironment = new UrlRuntimeEnvironment( window.location );
const impressionCount = new LocalImpressionCount( page.getTracking().keyword, runtimeEnvironment );
const tracker = new TrackerWPDE( 'FundraisingTracker', page.getTracking().keyword, eventMap, runtimeEnvironment );

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: 0,
		transitionDuration: 0
	},
	bannerCategory: 'fundraisingThankyou',
	bannerProps: {
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
