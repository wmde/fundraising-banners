import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { CloseSources } from '@src/tracking/CloseSources';
import { Tracker } from '@src/tracking/Tracker';
import { CloseEvent } from '@src/tracking/events/CloseEvent';
import { ResizeHandler } from '@src/utils/ResizeHandler';

export class ClosedState extends BannerState {
	// TODO: Make this private and add getter
	public stateName: BannerStates = BannerStates.Closed;
	private page: Page;
	private readonly source: CloseSources;
	private tracker: Tracker;
	private resizeHandler: ResizeHandler;

	public constructor( source: CloseSources, page: Page, tracker: Tracker, resizeHandler: ResizeHandler ) {
		super();
		this.page = page;
		this.source = source;
		this.tracker = tracker;
		this.resizeHandler = resizeHandler;
	}

	public enter(): Promise<any> {
		this.tracker.trackEvent( new CloseEvent( this.source ) );
		this.page
			.unsetAnimated()
			.setSpace( 0 )
			.setCloseCookieIfNecessary( this.source )
			.removePageEventListeners();
		this.resizeHandler.onClose();
		return Promise.resolve();
	}

	public exit(): Promise<any> {
		return Promise.resolve();
	}

	public onResize(): void {
	}

}
