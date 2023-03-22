import { Page } from '@src/page/Page';
import { Skin } from '@src/page/skin/Skin';
import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';
import { EventData } from '@src/tracking/EventData';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
import { CloseSources } from '@src/tracking/CloseSources';
import { BannerEvent } from '@src/page/MediaWiki/BannerEvent';
import { Vector2 } from '@src/utils/Vector2';
import { CampaignParameters } from '@src/CampaignParameters';

export const bannerContainerId = 'wmde-banner-app';
export const bannerAnimatedClass = 'wmde-animate-banner';
export const showBannerClass = 'wmde-show-banner';
export const bannerHeightCssVariable = '--wmde-banner-height';
export const bannerTransitionDurationCssVariable = '--wmde-banner-transition-duration';

class PageOrg implements Page {

	private mediaWiki: MediaWiki;
	private skin: Skin;
	private sizeIssueChecker: SizeIssueChecker;

	public constructor( mediaWiki: MediaWiki, skin: Skin, sizeIssueChecker: SizeIssueChecker ) {
		this.mediaWiki = mediaWiki;
		this.skin = skin;
		this.sizeIssueChecker = sizeIssueChecker;
	}

	public getBannerContainer(): string {
		const mountPoint = document.createElement( 'div' );
		mountPoint.id = bannerContainerId;
		document.body.prepend( mountPoint );
		return '#' + bannerContainerId;
	}

	public getReasonToNotShowBanner( bannerDimensions: Vector2 ): BannerNotShownReasons {
		if ( !this.mediaWiki.isShowingContentPage() ) {
			return BannerNotShownReasons.UserInteraction;
		}

		if ( this.mediaWiki.isContentHiddenByLightbox() ) {
			return BannerNotShownReasons.UserInteraction;
		}

		if ( !this.mediaWiki.isInArticleNamespace() ) {
			return BannerNotShownReasons.DisallowedNamespace;
		}

		if ( this.hasSizeIssues( bannerDimensions ) ) {
			return BannerNotShownReasons.SizeIssue;
		}

		return null;
	}

	private hasSizeIssues( bannerDimensions: Vector2 ): boolean {
		const skinSpaceAdjustment: Vector2 = new Vector2( 0, this.skin.minimumVisiblePageBeneathBanner() );
		return this.sizeIssueChecker.hasSizeIssues( bannerDimensions, skinSpaceAdjustment );
	}

	public trackEvent( trackingData: EventData ): void {
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

	public onPageEventThatShouldHideBanner( hideBannerListener: () => void ): void {
		this.skin.addHideBannerListener( hideBannerListener );
	}

	public removePageEventListeners(): Page {
		this.skin.removeEventListeners();
		return this;
	}

	public setSpace( space: number ): Page {
		document.body.style.setProperty( bannerHeightCssVariable, `${space}px` );
		return this;
	}

	public setAnimated(): Page {
		document.body.classList.add( bannerAnimatedClass );
		return this;
	}

	public unsetAnimated(): Page {
		document.body.classList.remove( bannerAnimatedClass );
		return this;
	}

	public setTransitionDuration( duration: number ): Page {
		document.body.style.setProperty( bannerTransitionDurationCssVariable, `${duration}ms` );
		return this;
	}

	public showBanner(): Page {
		document.body.classList.add( showBannerClass );
		return this;
	}

	public preventImpressionCountForHiddenBanner(): Page {
		this.mediaWiki.setBannerLoadedButHidden();
		return this;
	}

	public setCloseCookieIfNecessary( source: CloseSources ): Page {
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
		return this;
	}

	public getCampaignParameters(): CampaignParameters {
		const element = document.getElementById( 'wmde-campaign-parameters' );
		if ( !element ) {
			throw new Error( 'Campaign data element not found' );
		}
		const data = element.dataset;

		return {
			campaignProjection: {
				goalDonationSum: Number( data.goalDonationSum ),
				baseDate: data.donationsDateBase,
				baseDonationSum: Number( data.donationsCollectedBase ),
				donorsBase: Number( data.donorsBase ),
				donationAmountPerMinute: Number( data.donationsPerMinute ),
				donorsPerMinute: Number( data.donorsPerMinute ),
				averageAmountPerDonation: Number( data.averageAmountPerDonation )
			},
			millionImpressionsPerDay: Number( data.millionImpressionsPerDay ),
			startDate: data.campaignStartDate,
			endDate: data.campaignEndDate,
			numberOfMembers: Number( data.numberOfMembers )
		};
	}
}

export default PageOrg;
