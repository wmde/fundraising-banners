import { Page } from '@src/page/Page';
import { BannerNotShownReasons } from './BannerNotShownReasons';
import { CampaignParameters } from '@src/CampaignParameters';
import { TrackingParameters } from '@src/TrackingParameters';
import { getCampaignParameterOverride } from '@environment/CampaignParameterOverride';

interface WpdeWindow extends Window {
	campaignParameters: CampaignParameters;
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
		return getCampaignParameterOverride( window.campaignParameters );
	}

	public getTracking(): TrackingParameters {
		// TODO implement
		throw new Error( 'Not implemented' );
	}
}

export default PageDe;
