import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { CloseSources } from '@src/tracking/CloseSources';
import { Tracker } from '@src/tracking/Tracker';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { ResizeHandler } from '@src/utils/ResizeHandler';

export class ClosedState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.Closed;
	private readonly _source: CloseSources;
	private _page: Page;
	private _tracker: Tracker;
	private _resizeHandler: ResizeHandler;

	public constructor( source: CloseSources, page: Page, tracker: Tracker, resizeHandler: ResizeHandler ) {
		super();
		this._source = source;
		this._page = page;
		this._tracker = tracker;
		this._resizeHandler = resizeHandler;
	}

	public enter(): Promise<any> {
		this._tracker.trackEvent( new CloseEvent( this._source ) );
		this._page
			.unsetAnimated()
			.setSpace( 0 )
			.setCloseCookieIfNecessary( this._source )
			.removePageEventListeners();
		this._resizeHandler.onClose();
		return Promise.resolve();
	}

	public exit(): Promise<any> {
		return Promise.resolve();
	}

	public onResize(): void {
	}

}
