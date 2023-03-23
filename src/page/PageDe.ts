import { Page } from '@src/page/Page';
import { BannerNotShownReasons } from './BannerNotShownReasons';
import { CampaignParameters } from '@src/CampaignParameters';
import { TrackingParameters } from '@src/TrackingParameters';
import { getCampaignParameterOverride } from '@environment/CampaignParameterOverride';

export interface WpdeWindow extends Window {
	campaignParameters: CampaignParameters;
	CampaignName: string,
	BannerName: string
}

declare let window: WpdeWindow;

class PageDe implements Page {

	public getBannerContainer(): string {
		return '#WMDE-Banner-Container';
	}

	public shouldShowBanner(): boolean {
		return true;
	}

	public trackEvent(): void {
	}

	public trackSizeIssue(): void {
	}

	public onPageEventThatShouldHideBanner(): void {
	}

	public removePageEventListeners(): Page {
		return this;
	}

	public setSpace(): Page {
		return this;
	}

	public setAnimated(): Page {
		return this;
	}

	public unsetAnimated(): Page {
		return this;
	}

	public setTransitionDuration(): Page {
		return this;
	}

	public showBanner(): Page {
		return this;
	}

	public getReasonToNotShowBanner: () => BannerNotShownReasons;
	public preventImpressionCountForHiddenBanner: () => Page;
	public setCloseCookieIfNecessary(): Page {
		return this;
	}

	public getCampaignParameters(): CampaignParameters {
		if ( !window.campaignParameters ) {
			throw new Error( 'Campaign parameters are not set globally' );
		}

		return getCampaignParameterOverride( window.campaignParameters );
	}

	public getTracking(): TrackingParameters {
		return { campaign: window.CampaignName, keyword: window.BannerName };
	}
}

export default PageDe;
