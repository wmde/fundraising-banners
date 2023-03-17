import { Page } from '@src/page/Page';
import { Skin } from '@src/page/skin/Skin';
import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';
import { Tracker } from '@src/tracking/Tracker';
import { EventData } from '@src/tracking/EventData';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
import { CloseSources } from '@src/tracking/CloseSources';
import { BannerEvent } from '@src/page/MediaWiki/BannerEvent';
import { Vector2 } from '@src/utils/Vector2';

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
		if ( this.hasSizeIssues() ) {
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

	private hasSizeIssues(): boolean {
		const skinSpaceAdjustment: Vector2 = new Vector2( 0, this.skin.minimumVisiblePageBeneathBanner() );
		return this.sizeIssueChecker.hasSizeIssues( skinSpaceAdjustment );
	}

	trackEvent( trackingData: EventData ): void {
		const bannerEvent: BannerEvent = {
			bannerAction: trackingData.eventName,
			bannerName: '',
			eventRate: trackingData.trackingRate,
			finalSlide: 0,
			slidesShown: 0
		};
		this.mediaWiki.track( 'event.WMDEBannerEvents', bannerEvent );
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

	onBannerWasNotShown(): void {
	}

	setCloseCookieIfNecessary( source: CloseSources ): void {
		switch ( source ) {
			case CloseSources.AlreadyDonated:
				this.mediaWiki.preventBannerDisplayUntilEndOfCampaign();
				break;
			case CloseSources.SoftCloseBannerRejected:
				this.mediaWiki.preventBannerDisplayForPeriod();
				break;
			case CloseSources.MainBanner:
				this.mediaWiki.preventBannerDisplayForPeriod();
				break;
			case CloseSources.MiniBanner:
				this.mediaWiki.preventBannerDisplayForPeriod();
				break;
			case CloseSources.FollowUpBanner:
				break;

			// TODO add more cases for banner display prevention with central notice cookies after closing
		}
	}
}

export default PageOrg;
