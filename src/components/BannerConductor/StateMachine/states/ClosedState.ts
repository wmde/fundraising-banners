import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { Tracker } from '@src/tracking/Tracker';
import { ResizeHandler } from '@src/utils/ResizeHandler';
import { TrackingEvent } from '@src/tracking/TrackingEvent';

export class ClosedState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.Closed;
	private readonly _closeEvent: TrackingEvent;
	private _page: Page;
	private _tracker: Tracker;
	private _resizeHandler: ResizeHandler;

	public constructor( closeEvent: TrackingEvent, page: Page, tracker: Tracker, resizeHandler: ResizeHandler ) {
		super();
		this._closeEvent = closeEvent;
		this._page = page;
		this._tracker = tracker;
		this._resizeHandler = resizeHandler;
	}

	public enter(): Promise<any> {
		this._tracker.trackEvent( this._closeEvent );
		this._page
			.unsetAnimated()
			.setSpace( 0 )
			.setCloseCookieIfNecessary( this._closeEvent )
			.removePageEventListeners();
		this._resizeHandler.onClose();
		return Promise.resolve();
	}

	public exit(): Promise<any> {
		throw new Error( 'This state will never be exited' );
	}

}
