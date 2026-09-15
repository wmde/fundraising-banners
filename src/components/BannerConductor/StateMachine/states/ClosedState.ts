import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import type { Page } from '@src/page/Page';
import type { Tracker } from '@src/tracking/Tracker';
import type { ResizeHandler } from '@src/utils/ResizeHandler';
import type { TrackingEvent } from '@src/tracking/TrackingEvent';
import type { Timer } from '@src/utils/Timer';
import type { BannerCategory } from '@src/components/BannerConductor/BannerCategory';

export class ClosedState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.Closed;
	private readonly _closeEvent: TrackingEvent<void>;
	private readonly _bannerCategory: BannerCategory;
	private _page: Page;
	private _tracker: Tracker;
	private _resizeHandler: ResizeHandler;
	private _timer: Timer;
	private readonly _donateLinkTooltipMessage: string|null;

	public constructor(
		closeEvent: TrackingEvent<void>,
		bannerCategory: BannerCategory,
		page: Page,
		tracker: Tracker,
		resizeHandler: ResizeHandler,
		timer: Timer,
		donateLinkTooltipMessage: string|null = null
	) {
		super();
		this._closeEvent = closeEvent;
		this._bannerCategory = bannerCategory;
		this._page = page;
		this._tracker = tracker;
		this._resizeHandler = resizeHandler;
		this._timer = timer;
		this._donateLinkTooltipMessage = donateLinkTooltipMessage;
	}

	public enter(): Promise<any> {
		this._tracker.trackEvent( this._closeEvent );
		this._page
			.unsetAnimated()
			.setSpace( 0 )
			.setCloseCookieIfNecessary( this._closeEvent, this._bannerCategory )
			.removePageEventListeners();
		this._resizeHandler.onClose();
		this._timer.clearAll();
		if ( this._donateLinkTooltipMessage !== null ) {
			return this._page.showDonateLinkTooltip( this._donateLinkTooltipMessage );
		} else {
			return Promise.resolve();
		}
	}

	public exit(): Promise<any> {
		throw new Error( 'This state will never be exited' );
	}

}
