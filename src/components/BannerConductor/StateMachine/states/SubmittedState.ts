import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import type { Page } from '@src/page/Page';
import type { ResizeHandler } from '@src/utils/ResizeHandler';
import type { Timer } from '@src/utils/Timer';

export class SubmittedState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.Submitted;
	private _page: Page;
	private _resizeHandler: ResizeHandler;
	private _timer: Timer;

	public constructor(
		page: Page,
		resizeHandler: ResizeHandler,
		timer: Timer
	) {
		super();
		this._page = page;
		this._resizeHandler = resizeHandler;
		this._timer = timer;
	}

	public enter(): Promise<any> {
		this._page
			.unsetAnimated()
			.setSpace( 0 )
			.removePageEventListeners();
		this._resizeHandler.onClose();
		this._timer.clearAll();
		return Promise.resolve();
	}

	public exit(): Promise<any> {
		throw new Error( 'This state will never be exited' );
	}

	public onContentChanged(): void {
		// Content changed will fire on the submit button press so it
		// needs to be caught here else it will throw an exception
	}

}
