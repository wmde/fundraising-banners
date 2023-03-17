import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { Page } from '@src/page/Page';
import { Tracker } from '@src/tracking/Tracker';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';

export class NotShownState extends BannerState {
	stateName: BannerStates = BannerStates.NotShown;
	private readonly bannerNotShownReason: BannerNotShownReasons;
	private page: Page;
	private tracker: Tracker;

	constructor( bannerNotShownReason: BannerNotShownReasons, page: Page, tracker: Tracker ) {
		super();
		this.bannerNotShownReason = bannerNotShownReason;
		this.page = page;
		this.tracker = tracker;
	}

	enter(): Promise<any> {
		this.tracker.trackEvent( new NotShownEvent( this.bannerNotShownReason ) );
		this.page.preventImpressionCountForHiddenBanner();
		return Promise.resolve( true );
	}

	exit(): Promise<any> {
		return Promise.resolve( true );
	}

	onResize(): void {
		// Do nothing
	}
}
