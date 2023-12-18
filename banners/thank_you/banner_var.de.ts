import { createVueApp } from '@src/createVueApp';

import './styles/styles.scss';

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
import Banner from './components/BannerVar.de.vue';
import messages from './messages.de';
import eventMappings from '../thank_you/event_map';
import TranslationPlugin from '@src/TranslationPlugin';
import { TrackingMembershipFormActions } from './MembershipFormActions';
import { createSubscribeURL } from './createSubscribeURL';
import { createThankYouSettings } from './settings';
import { IntegerDe } from '@src/utils/DynamicContent/formatters/IntegerDe';

const translator = new Translator( messages );
const mediaWiki = new WindowMediaWiki();
const page = new PageWPORG( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker( 400 ) );
const runtimeEnvironment = new UrlRuntimeEnvironment( window.location );
const impressionCount = new LocalImpressionCount( page.getTracking().keyword, runtimeEnvironment );
const tracker = new LegacyTrackerWPORG( mediaWiki, page.getTracking().keyword, eventMappings, runtimeEnvironment );

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: 0,
		transitionDuration: 1000
	},
	bannerProps: {
		settings: createThankYouSettings( new IntegerDe() ),
		subscribeURL: createSubscribeURL( page.getTracking(), impressionCount )
	},
	resizeHandler: new WindowResizeHandler(),
	banner: Banner,
	impressionCount
} );

app.use( TranslationPlugin, translator );
app.provide( 'tracker', tracker );
app.provide( 'formActions', new TrackingMembershipFormActions( page.getTracking(), impressionCount ) );

app.mount( page.getBannerContainer() );
