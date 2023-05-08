import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { PendingState } from '@src/components/BannerConductor/StateMachine/states/PendingState';
import { Page } from '@src/page/Page';
import { NotShownState } from '@src/components/BannerConductor/StateMachine/states/NotShownState';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { Tracker } from '@src/tracking/Tracker';
import { ResizeHandler } from '@src/utils/ResizeHandler';
import { ShowingState } from '@src/components/BannerConductor/StateMachine/states/ShowingState';
import { BannerConfig } from '@src/BannerConfig';
import { VisibleState } from '@src/components/BannerConductor/StateMachine/states/VisibleState';
import { ImpressionCount } from '@src/utils/ImpressionCount';
import { ClosedState } from '@src/components/BannerConductor/StateMachine/states/ClosedState';
import { CloseSources } from '@src/tracking/CloseSources';
import { InitialState } from '@src/components/BannerConductor/StateMachine/states/InitialState';

export class StateFactory {
	private readonly _bannerConfig: BannerConfig;
	private readonly _page: Page;
	private readonly _tracker: Tracker;
	private readonly _resizeHandler: ResizeHandler;
	private readonly _impressionCount: ImpressionCount;

	public constructor( bannerConfig: BannerConfig, page: Page, tracker: Tracker, resizeHandler: ResizeHandler, impressionCount: ImpressionCount ) {
		this._bannerConfig = bannerConfig;
		this._page = page;
		this._tracker = tracker;
		this._resizeHandler = resizeHandler;
		this._impressionCount = impressionCount;
	}

	public newInitialState(): BannerState {
		return new InitialState();
	}

	public newPendingState( bannerHeight: number ): BannerState {
		return new PendingState( this._page, bannerHeight, this._bannerConfig.delay );
	}

	public newNotShownState( bannerNotShownReason: BannerNotShownReasons, bannerHeight: number ): BannerState {
		return new NotShownState( bannerNotShownReason, this._page, this._tracker, this._resizeHandler, bannerHeight );
	}

	public newShowingState(): BannerState {
		return new ShowingState( this._page, this._bannerConfig.transitionDuration );
	}

	public newVisibleState(): BannerState {
		return new VisibleState( this._page, this._impressionCount );
	}

	public newClosedState( source: CloseSources ): BannerState {
		return new ClosedState( source, this._page, this._tracker, this._resizeHandler );
	}
}

export function newStateFactory( bannerConfig: BannerConfig, page: Page, tracker: Tracker, resizeHandler: ResizeHandler, impressionCount: ImpressionCount ): StateFactory {
	return new StateFactory(
		bannerConfig,
		page,
		tracker,
		resizeHandler,
		impressionCount
	);
}
