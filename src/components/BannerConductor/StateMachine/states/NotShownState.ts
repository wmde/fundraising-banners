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
	private _bannerHeight: number;

	public constructor( bannerNotShownReason: BannerNotShownReasons, page: Page, tracker: Tracker, resizeHandler: ResizeHandler, bannerHeight: number ) {
		super();
		this._bannerNotShownReason = bannerNotShownReason;
		this._page = page;
		this._tracker = tracker;
		this._resizeHandler = resizeHandler;
		this._bannerHeight = bannerHeight;
	}

	public enter(): Promise<any> {
		let customEventData: Record<string, string | number> = {};
		if ( this._bannerNotShownReason === BannerNotShownReasons.SizeIssue ) {
			customEventData = {
				reason: this._bannerNotShownReason,
				bannerHeight: this._bannerHeight,
				viewportWidth: window.innerWidth,
				viewportHeight: window.innerHeight
			};
		}
		this._tracker.trackEvent( new NotShownEvent( customEventData ) );
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
