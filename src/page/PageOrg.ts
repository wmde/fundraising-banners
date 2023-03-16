import { Page } from '@src/page/Page';
import { SizeIssue } from '@src/tracking/SizeIssue';
import { Skin } from '@src/page/skin/Skin';
import { MediaWiki } from '@src/page/MediaWiki';
import { Tracker } from '@src/tracking/Tracker';
import { EventData } from '@src/tracking/EventData';

export const bannerContainerId = 'wmde-banner-app';
export const bannerAnimatedClass = 'wmde-animate-banner';
export const showBannerClass = 'wmde-show-banner';
export const bannerHeightCssVariable = '--wmde-banner-height';
export const bannerTransitionDurationCssVariable = '--wmde-banner-transition-duration';

class PageOrg implements Page, Tracker {

	mediaWiki: MediaWiki;
	skin: Skin;

	constructor( mediaWiki: MediaWiki, skin: Skin ) {
		this.mediaWiki = mediaWiki;
		this.skin = skin;
	}

	getBannerContainer(): string {
		const mountPoint = document.createElement( 'div' );
		mountPoint.id = bannerContainerId;
		document.body.prepend( mountPoint );
		return '#' + bannerContainerId;
	}

	shouldShowBanner(): boolean {
		if ( !this.mediaWiki.isShowingContentPage() ) {
			return false;
		}

		if ( this.mediaWiki.isContentHiddenByLightbox() ) {
			return false;
		}

		if ( !this.mediaWiki.isInArticleNamespace() ) {
			return false;
		}

		return true;
	}

	trackEvent( trackingData: EventData ): void {
		this.mediaWiki.track( 'event.WMDEBannerEvents', trackingData );
	}

	trackSizeIssue( trackingData: SizeIssue ): void {
		this.mediaWiki.track( 'event.WMDEBannerSizeIssue', trackingData );
	}

	onPageEventThatShouldHideBanner( hideBannerListener: () => void ): void {
		this.skin.addHideBannerListener( hideBannerListener );
	}

	setSpace( space: number ): Page {
		document.body.style.setProperty( bannerHeightCssVariable, `${space}px` );
		return this;
	}

	setAnimated(): Page {
		document.body.classList.add( bannerAnimatedClass );
		return this;
	}

	unsetAnimated(): Page {
		document.body.classList.remove( bannerAnimatedClass );
		return this;
	}

	setTransitionDuration( duration: number ): Page {
		document.body.style.setProperty( bannerTransitionDurationCssVariable, `${duration}ms` );
		return this;
	}

	showBanner(): Page {
		document.body.classList.add( showBannerClass );
		return this;
	}
}

export default PageOrg;
