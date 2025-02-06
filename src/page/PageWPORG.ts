import { Page } from '@src/page/Page';
import { Skin } from '@src/page/skin/Skin';
import { MediaWiki } from '@src/page/MediaWiki/MediaWiki';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { SizeIssueChecker } from '@src/utils/SizeIssueChecker/SizeIssueChecker';
import { Vector2 } from '@src/utils/Vector2';
import { CampaignParameters } from '@src/domain/CampaignParameters';
import { ThankYouCampaignParameters } from '@src/domain/ThankYouCampaignParameters';
import { getCampaignParameterOverride } from '@environment/CampaignParameterOverride';
import { TrackingParameters } from '@src/domain/TrackingParameters';
import { CloseChoices } from '@src/domain/CloseChoices';
import { TrackingEvent } from '@src/tracking/TrackingEvent';
import { ChannelNameWPORG } from '@src/page/ChannelNameWPORG';
import { BannerCategory } from '@src/components/BannerConductor/BannerCategory';

export const bannerAppId = 'wmde-banner-app';
export const bannerAnimatedClass = 'wmde-animate-banner';
export const showBannerClass = 'wmde-show-banner';
export const bannerHeightCssVariable = '--wmde-banner-height';
export const bannerTransitionDurationCssVariable = '--wmde-banner-transition-duration';
const centralNoticeBannerContainerId = 'WMDE-Banner-Container';
const campaignParametersId = 'wmde-campaign-parameters';

const campaignDataMaxImpressionsMap: Record<ChannelNameWPORG, string> = {
	desktop: 'maxImpressionsDesktop',
	english: 'maxImpressionsEnglish',
	mobile: 'maxImpressionsMobile',
	// eslint-disable-next-line camelcase
	mobile_english: 'maxImpressionsMobileEnglish',
	pad: 'maxImpressionsPad'
};

class PageWPORG implements Page {
	private _mediaWiki: MediaWiki;
	private _skin: Skin;
	private _sizeIssueChecker: SizeIssueChecker;

	private _trackingParameters: TrackingParameters;
	private _campaignData: DOMStringMap;

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

	public onPageEventThatShouldHideBanner( hideBannerListener: () => void ): void {
		this._skin.addHideBannerListener( hideBannerListener );
	}

	public removePageEventListeners(): Page {
		this._skin.removeEventListeners();
		return this;
	}

	public setSpace( space: number ): Page {
		document.body.style.setProperty( bannerHeightCssVariable, `${ space }px` );
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
		document.body.style.setProperty( bannerTransitionDurationCssVariable, `${ duration }ms` );
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

	public setCloseCookieIfNecessary( closeEvent: TrackingEvent<void>, bannerCategory: BannerCategory ): Page {

		// remove banner class (and changes to the wikipedia skin) when the banner hides
		document.body.classList.remove( showBannerClass );

		switch ( closeEvent.userChoice ) {
			case CloseChoices.Close:
			case CloseChoices.TimeOut:
				this._mediaWiki.preventBannerDisplayForPeriod( bannerCategory );
				break;
			case CloseChoices.NoMoreBannersForCampaign:
				this._mediaWiki.preventBannerDisplayUntilEndOfCampaign( bannerCategory );
				break;
			case CloseChoices.MaybeLater:
				this._mediaWiki.preventBannerDisplayForHours( 6, bannerCategory );
				break;
			case CloseChoices.AlreadyDonated:
				this._mediaWiki.preventBannerDisplayForHours( 4 * 7 * 24, bannerCategory );
				break;
			case CloseChoices.Hide:
				// Don't add cookie
				break;
		}

		return this;
	}

	private getCampaignData(): DOMStringMap {
		if ( !this._campaignData ) {
			const element = document.getElementById( campaignParametersId );
			if ( !element ) {
				throw new Error( 'Campaign data element not found' );
			}
			this._campaignData = element.dataset;
		}

		return this._campaignData;
	}

	public getCampaignParameters(): CampaignParameters {
		const data = this.getCampaignData();

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
			numberOfMembers: Number( data.numberOfMembers ),
			isLateProgress: data.isLateProgress === 'true',
			dramaTextIsVisible: data.dramaTextIsVisible === 'true',
			urgencyMessageDaysLeft: Number( data.urgencyMessageDaysLeft )
		};

		return getCampaignParameterOverride( campaignParameters );
	}

	public getThankYouCampaignParameters(): ThankYouCampaignParameters {
		const data = this.getCampaignData();

		const thankYouCampaignParameters = {
			numberOfDonors: Number( data.tyNumberOfDonors ),
			numberOfMembers: Number( data.tyNumberOfMembers ),
			progressBarPercentage: Number( data.tyProgressBarPercentage )
		};

		return thankYouCampaignParameters;
	}

	public getTracking(): TrackingParameters {
		if ( !this._trackingParameters ) {
			const element = document.getElementById( centralNoticeBannerContainerId );
			if ( !element ) {
				throw new Error( 'Banner container element not found' );
			}

			this._trackingParameters = {
				campaign: element.dataset.campaignTracking,
				keyword: element.dataset.tracking
			};
		}

		return this._trackingParameters;
	}

	public getMaxBannerImpressions( channel: ChannelNameWPORG ): number {
		const maxImpressions = this.getCampaignData()[ campaignDataMaxImpressionsMap[ channel ] ];

		if ( !maxImpressions ) {
			throw new Error( `Max impressions count for ${ channel } does not exist` );
		}

		return Number( maxImpressions );
	}

	/**
	 * When a modal is open we set the body to fixed in order to hide the scroll bar
	 * and stop it interfering with the modal's scrollbar.
	 *
	 * We also set the top style so the page doesn't jump.
	 */
	public setModalOpened(): void {
		const scrollY = window.scrollY;
		document.body.style.position = 'fixed';
		document.body.style.top = `-${ scrollY }px`;
		document.body.style.width = '100vw';
	}

	/**
	 * Remove the body position fixed and jump the window to where the user was before
	 * they opened the modal.
	 */
	public setModalClosed(): void {
		const scrollY = document.body.style.top;
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.width = '';
		window.scrollTo( 0, parseInt( scrollY || '0' ) * -1 );
	}
}

export default PageWPORG;
