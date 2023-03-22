import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { Page } from '@src/page/Page';
import { Tracker } from '@src/tracking/Tracker';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { ResizeHandler } from '@src/utils/ResizeHandler';

export class NotShownState extends BannerState {
	// TODO: Make this private and add getter
	public stateName: BannerStates = BannerStates.NotShown;
	private readonly bannerNotShownReason: BannerNotShownReasons;
	private page: Page;
	private tracker: Tracker;
	private resizeHandler: ResizeHandler;

	public constructor( bannerNotShownReason: BannerNotShownReasons, page: Page, tracker: Tracker, resizeHandler: ResizeHandler ) {
		super();
		this.bannerNotShownReason = bannerNotShownReason;
		this.page = page;
		this.tracker = tracker;
		this.resizeHandler = resizeHandler;
	}

	public enter(): Promise<any> {
		this.tracker.trackEvent( new NotShownEvent( this.bannerNotShownReason ) );
		this.page
			.preventImpressionCountForHiddenBanner()
			.removePageEventListeners();
		this.resizeHandler.onClose();
		return Promise.resolve( true );
	}

	public exit(): Promise<any> {
		return Promise.resolve( true );
	}

	public onResize(): void {
		// Do nothing
	}
}
