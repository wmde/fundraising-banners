import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';
import { Translator } from '@src/Translator';
import { UrlRuntimeEnvironment } from '@src/utils/RuntimeEnvironment';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import Banner from './components/BannerCtrl.de.vue';
import messages from './messages.de';
import TranslationPlugin from '@src/TranslationPlugin';
import { TrackingMembershipFormActions } from './MembershipFormActions';
import { createTrackedURL, SUBSCRIBE_URL, USE_OF_FUNDS_URL } from './createTrackedURL';
import PageWPDE from '@src/page/PageWPDE';
import { TrackerWPDE } from '@src/tracking/TrackerWPDE';
import eventMap from './event_map.wpde';
import { createThankYouSettings } from './settings';
import { IntegerDe } from '@src/utils/DynamicContent/formatters/IntegerDe';
import { Locales } from '@src/domain/Locales';
import { WindowTimer } from '@src/utils/Timer';

// Tracking placeholders will be replaced by webpack string-replace-loader
// using the campaign configuration ( campaign_info.toml ) for the correct values
const tracking = {
	campaign: '!insert-campaign-here!',
	keyword: '!insert-keyword-here!'
};

const translator = new Translator( messages );
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
		settings: createThankYouSettings( new IntegerDe(), page.getThankYouCampaignParameters() ),
		subscribeURL: createTrackedURL( SUBSCRIBE_URL, page.getTracking(), impressionCount, Locales.DE ),
		useOfFundsURL: createTrackedURL( USE_OF_FUNDS_URL, page.getTracking(), impressionCount, Locales.DE )
	},
	resizeHandler: new WindowResizeHandler(),
	banner: Banner,
	impressionCount
} );

app.use( TranslationPlugin, translator );
app.provide( 'tracker', tracker );
app.provide( 'formActions', new TrackingMembershipFormActions( page.getTracking(), impressionCount, Locales.DE ) );
app.provide( 'timer', new WindowTimer() );

app.mount( page.getBannerContainer() );
