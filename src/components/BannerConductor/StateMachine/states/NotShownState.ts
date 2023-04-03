import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { Page } from '@src/page/Page';
import { Tracker } from '@src/tracking/Tracker';
import { NotShownEvent } from '@src/tracking/events/NotShownEvent';
import { ResizeHandler } from '@src/utils/ResizeHandler';

export class NotShownState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.NotShown;
	private readonly _bannerNotShownReason: BannerNotShownReasons;
	private _page: Page;
	private _tracker: Tracker;
	private _resizeHandler: ResizeHandler;

	public constructor( bannerNotShownReason: BannerNotShownReasons, page: Page, tracker: Tracker, resizeHandler: ResizeHandler ) {
		super();
		this._bannerNotShownReason = bannerNotShownReason;
		this._page = page;
		this._tracker = tracker;
		this._resizeHandler = resizeHandler;
	}

	public enter(): Promise<any> {
		this._tracker.trackEvent( new NotShownEvent( this._bannerNotShownReason ) );
		this._page
			.preventImpressionCountForHiddenBanner()
			.removePageEventListeners();
		this._resizeHandler.onClose();
		return Promise.resolve( true );
	}

	public exit(): Promise<any> {
		return Promise.resolve( true );
	}
}
