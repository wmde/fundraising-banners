import { Page } from '@src/page/Page';
import { Skin } from '@src/page/skin/Skin';
import { MediaWiki } from '@src/page/MediaWiki';
import { Tracker } from '@src/tracking/Tracker';
import { EventData } from '@src/tracking/EventData';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';

export const bannerContainerId = 'wmde-banner-app';
export const bannerAnimatedClass = 'wmde-animate-banner';
export const showBannerClass = 'wmde-show-banner';
export const bannerHeightCssVariable = '--wmde-banner-height';
export const bannerTransitionDurationCssVariable = '--wmde-banner-transition-duration';

class PageOrg implements Page, Tracker {

	private mediaWiki: MediaWiki;
	private skin: Skin;
	private sizeIssueChecker: SizeIssueChecker;

	constructor( mediaWiki: MediaWiki, skin: Skin, sizeIssueChecker: SizeIssueChecker ) {
		this.mediaWiki = mediaWiki;
		this.skin = skin;
		this.sizeIssueChecker = sizeIssueChecker;
	}

	getBannerContainer(): string {
		const mountPoint = document.createElement( 'div' );
		mountPoint.id = bannerContainerId;
		document.body.prepend( mountPoint );
		return '#' + bannerContainerId;
	}

	getReasonToNotShowBanner(): BannerNotShownReasons {
		if ( this.sizeIssueChecker.hasSizeIssues() ) {
			return BannerNotShownReasons.SizeIssue;
		}

		if ( !this.mediaWiki.isShowingContentPage() ) {
			return BannerNotShownReasons.UserInteraction;
		}

		if ( this.mediaWiki.isContentHiddenByLightbox() ) {
			return BannerNotShownReasons.UserInteraction;
		}

		if ( !this.mediaWiki.isInArticleNamespace() ) {
			return BannerNotShownReasons.DisallowedNamespace;
		}

		return null;
	}

	trackEvent( trackingData: EventData ): void {
		this.mediaWiki.track( 'event.WMDEBannerEvents', trackingData );
		// this.mediaWiki.track( 'event.WMDEBannerSizeIssue', trackingData );
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

	notifyThatBannerWasNotShown(): void {
	}
}

export default PageOrg;
