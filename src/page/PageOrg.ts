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
import { getCampaignParameterOverride } from '@environment/CampaignParameterOverride';
import { TrackingParameters } from '@src/TrackingParameters';

export const bannerAppId = 'wmde-banner-app';
export const bannerAnimatedClass = 'wmde-animate-banner';
export const showBannerClass = 'wmde-show-banner';
export const bannerHeightCssVariable = '--wmde-banner-height';
export const bannerTransitionDurationCssVariable = '--wmde-banner-transition-duration';
const centralNoticeBannerContainerId = 'WMDE-Banner-Container';
const campaignParametersId = 'wmde-campaign-parameters';

class PageOrg implements Page {
	private _mediaWiki: MediaWiki;
	private _skin: Skin;
	private _sizeIssueChecker: SizeIssueChecker;

	public constructor( mediaWiki: MediaWiki, skin: Skin, sizeIssueChecker: SizeIssueChecker ) {
		this._sizeIssueChecker = sizeIssueChecker;
		this._skin = skin;
		this._mediaWiki = mediaWiki;
	}

	public getBannerContainer(): string {
		const mountPoint = document.createElement( 'div' );
		mountPoint.id = bannerAppId;
		document.body.prepend( mountPoint );
		return '#' + bannerAppId;
	}

	public getReasonToNotShowBanner( bannerDimensions: Vector2 ): BannerNotShownReasons {
		if ( !this._mediaWiki.isShowingContentPage() ) {
			return BannerNotShownReasons.UserInteraction;
		}

		if ( this._mediaWiki.isContentHiddenByLightbox() ) {
			return BannerNotShownReasons.UserInteraction;
		}

		if ( !this._mediaWiki.isInArticleNamespace() ) {
			return BannerNotShownReasons.DisallowedNamespace;
		}

		if ( this.hasSizeIssues( bannerDimensions ) ) {
			return BannerNotShownReasons.SizeIssue;
		}

		return null;
	}

	private hasSizeIssues( bannerDimensions: Vector2 ): boolean {
		const skinSpaceAdjustment: Vector2 = new Vector2( 0, this._skin.minimumVisiblePageBeneathBanner() );
		return this._sizeIssueChecker.hasSizeIssues( bannerDimensions, skinSpaceAdjustment );
	}

	public trackEvent( trackingData: EventData ): void {
		const bannerEvent: BannerEvent = {
			bannerAction: trackingData.eventName,
			bannerName: '',
			eventRate: trackingData.trackingRate,
			finalSlide: 0,
			slidesShown: 0
		};
		this._mediaWiki.track( 'event.WMDEBannerEvents', bannerEvent );
		// this._mediaWiki.track( 'event.WMDEBannerSizeIssue', trackingData );
	}

	public onPageEventThatShouldHideBanner( hideBannerListener: () => void ): void {
		this._skin.addHideBannerListener( hideBannerListener );
	}

	public removePageEventListeners(): Page {
		this._skin.removeEventListeners();
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
		this._mediaWiki.setBannerLoadedButHidden();
		return this;
	}

	public setCloseCookieIfNecessary( source: CloseSources ): Page {
		switch ( source ) {
			case CloseSources.AlreadyDonatedGoAway:
				this._mediaWiki.preventBannerDisplayUntilEndOfCampaign();
				break;
			case CloseSources.AlreadyDonatedMaybeLater:
				break;
			case CloseSources.SoftCloseBannerRejected:
				this._mediaWiki.preventBannerDisplayForPeriod();
				break;
			case CloseSources.MainBanner:
				this._mediaWiki.preventBannerDisplayForPeriod();
				break;
			case CloseSources.MiniBanner:
				this._mediaWiki.preventBannerDisplayForPeriod();
				break;
			case CloseSources.FollowUpBanner:
				break;

			// TODO add more cases for banner display prevention with central notice cookies after closing
		}
		return this;
	}

	public getCampaignParameters(): CampaignParameters {
		const element = document.getElementById( campaignParametersId );
		if ( !element ) {
			throw new Error( 'Campaign data element not found' );
		}
		const data = element.dataset;

		const campaignParameters = {
			campaignProjection: {
				donationTarget: Number( data.donationTarget ),
				updatedAt: data.updatedAt,
				donationSumBase: Number( data.donationSumBase ),
				donationCountBase: Number( data.donationCountBase ),
				donationAmountPerMinute: Number( data.donationAmountPerMinute ),
				donationCountPerMinute: Number( data.donationCountPerMinute ),
				averageAmountPerDonation: Number( data.averageAmountPerDonation )
			},
			millionImpressionsPerDay: Number( data.millionImpressionsPerDay ),
			startDate: data.startDate,
			endDate: data.endDate,
			numberOfMembers: Number( data.numberOfMembers )
		};

		return getCampaignParameterOverride( campaignParameters );
	}

	public getTracking(): TrackingParameters {

		const element = document.getElementById( centralNoticeBannerContainerId );
		if ( !element ) {
			throw new Error( 'Banner container element not found' );
		}
		return {
			campaign: element.dataset.campaignTracking,
			keyword: element.dataset.tracking
		};
	}
}

export default PageOrg;
