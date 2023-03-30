import { createVueApp } from '@src/createVueApp';

import BannerConductor from '@src/components/BannerConductor/BannerConductor.vue';
import MainBanner from './components/MainBanner.vue';
import getBannerDelay from '@src/utils/getBannerDelay';
import { WindowResizeHandler } from '@src/utils/ResizeHandler';
import PageOrg from '@src/page/PageOrg';
import { WindowMediaWiki } from '@src/page/MediaWiki/WindowMediaWiki';
import { SkinFactory } from '@src/page/skin/SkinFactory';
import { WindowSizeIssueChecker } from '@src/utils/SizeIssueChecker/WindowSizeIssueChecker';

const mediaWiki = new WindowMediaWiki();
const page = new PageOrg( mediaWiki, ( new SkinFactory( mediaWiki ) ).getSkin(), new WindowSizeIssueChecker() );

const app = createVueApp( BannerConductor, {
	page,
	bannerConfig: {
		delay: getBannerDelay( 7500 ),
		transitionDuration: 500
	},
	resizeHandler: new WindowResizeHandler(),
	banner: MainBanner,
	bannerProps: {
		greeting: 'Hello'
	}
} );

// TODO: When getting translations make sure the 'custom-amount-placeholder' value is replace with 'custom-amount-placeholder-short'
//       This means it doesn't have to be passed around as a prop
//       Maybe rename it to 'custom-amount-placeholder-mobile'

app.mount( page.getBannerContainer() );
