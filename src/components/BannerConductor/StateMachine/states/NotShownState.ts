import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { Page } from '@src/page/Page';
import { Tracker } from '@src/tracking/Tracker';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { ResizeHandler } from '@src/utils/ResizeHandler';

export class NotShownState extends BannerState {
	stateName: BannerStates = BannerStates.NotShown;
	private readonly bannerNotShownReason: BannerNotShownReasons;
	private page: Page;
	private tracker: Tracker;
	private resizeHandler: ResizeHandler;

	constructor( bannerNotShownReason: BannerNotShownReasons, page: Page, tracker: Tracker, resizeHandler: ResizeHandler ) {
		super();
		this.bannerNotShownReason = bannerNotShownReason;
		this.page = page;
		this.tracker = tracker;
		this.resizeHandler = resizeHandler;
	}

	enter(): Promise<any> {
		this.tracker.trackEvent( new NotShownEvent( this.bannerNotShownReason ) );
		this.page
			.preventImpressionCountForHiddenBanner()
			.removePageEventListeners();
		this.resizeHandler.onClose();
		return Promise.resolve( true );
	}

	exit(): Promise<any> {
		return Promise.resolve( true );
	}

	onResize(): void {
		// Do nothing
	}
}
