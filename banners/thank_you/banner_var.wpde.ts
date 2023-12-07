import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';
import { Translator } from '@src/Translator';
import { UrlRuntimeEnvironment } from '@src/utils/RuntimeEnvironment';
import { LocalImpressionCount } from '@src/utils/LocalImpressionCount';
import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import Banner from './components/BannerVar.de.vue';
import messages from './messages.de';
import TranslationPlugin from '@src/TranslationPlugin';
import DynamicTextPlugin from '@src/DynamicTextPlugin';
import { LocaleFactoryDe } from '@src/utils/LocaleFactory/LocaleFactoryDe';
import { TrackingMembershipFormActions } from './MembershipFormActions';
import { createSubscribeURL } from './createSubscribeURL';
import PageWPDE from '@src/page/PageWPDE';
import { TrackerWPDE } from '@src/tracking/TrackerWPDE';
import eventMap from '../wpde_desktop/event_map';

const localeFactory = new LocaleFactoryDe();
const translator = new Translator( messages );

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
		transitionDuration: 1000
	},
	bannerProps: {
		progressBarFillPercentage: 80,
		subscribeURL: createSubscribeURL( page.getTracking(), impressionCount )
	},
	resizeHandler: new WindowResizeHandler(),
	banner: Banner,
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
app.provide( 'tracker', tracker );
app.provide( 'formActions', new TrackingMembershipFormActions( page.getTracking(), impressionCount ) );

app.mount( page.getBannerContainer() );
