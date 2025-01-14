import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { PendingState } from '@src/components/BannerConductor/StateMachine/states/PendingState';
import { Page } from '@src/page/Page';
import { NotShownState } from '@src/components/BannerConductor/StateMachine/states/NotShownState';
import { BannerNotShownReasons } from '@src/page/BannerNotShownReasons';
import { Tracker } from '@src/tracking/Tracker';
import { ResizeHandler } from '@src/utils/ResizeHandler';
import { ShowingState } from '@src/components/BannerConductor/StateMachine/states/ShowingState';
import { BannerConfig } from '@src/domain/BannerConfig';
import { VisibleState } from '@src/components/BannerConductor/StateMachine/states/VisibleState';
import { ImpressionCount } from '@src/utils/ImpressionCount';
import { ClosedState } from '@src/components/BannerConductor/StateMachine/states/ClosedState';
import { InitialState } from '@src/components/BannerConductor/StateMachine/states/InitialState';
import { TrackingEvent, TrackingFeatureName } from '@src/tracking/TrackingEvent';
import { Timer } from '@src/utils/Timer';
import { BannerCategory } from '@src/components/BannerConductor/BannerCategory';

export class StateFactory {
	private readonly _bannerConfig: BannerConfig;
	private readonly _page: Page;
	private readonly _tracker: Tracker;
	private readonly _resizeHandler: ResizeHandler;
	private readonly _impressionCount: ImpressionCount;
	private readonly _timer: Timer;
	private readonly _bannerCategory: BannerCategory;

	public constructor(
		bannerConfig: BannerConfig,
		page: Page, tracker: Tracker,
		resizeHandler: ResizeHandler,
		impressionCount: ImpressionCount,
		timer: Timer,
		bannerCategory: BannerCategory ) {
		this._bannerConfig = bannerConfig;
		this._page = page;
		this._tracker = tracker;
		this._resizeHandler = resizeHandler;
		this._impressionCount = impressionCount;
		this._timer = timer;
		this._bannerCategory = bannerCategory;
	}

	public newInitialState(): BannerState {
		return new InitialState();
	}

	public newPendingState( bannerHeight: number ): BannerState {
		return new PendingState( this._page, bannerHeight, this._bannerConfig.delay, this._timer );
	}

	public newNotShownState( bannerNotShownReason: BannerNotShownReasons, bannerHeight: number ): BannerState {
		return new NotShownState( bannerNotShownReason, this._page, this._tracker, this._resizeHandler, bannerHeight, this._timer );
	}

	public newShowingState(): BannerState {
		return new ShowingState( this._page, this._bannerConfig.transitionDuration, this._timer );
	}

	public newVisibleState( shownEventFeature: TrackingFeatureName ): BannerState {
		return new VisibleState( shownEventFeature, this._page, this._impressionCount, this._tracker );
	}

	public newClosedState( closeEvent: TrackingEvent<void> ): BannerState {
		return new ClosedState( closeEvent, this._bannerCategory, this._page, this._tracker, this._resizeHandler, this._timer );
	}
}

export function newStateFactory(
	bannerConfig: BannerConfig,
	page: Page,
	tracker: Tracker,
	resizeHandler: ResizeHandler,
	impressionCount: ImpressionCount,
	timer: Timer,
	bannerCategory: BannerCategory
): StateFactory {
	return new StateFactory(
		bannerConfig,
		page,
		tracker,
		resizeHandler,
		impressionCount,
		timer,
		bannerCategory
	);
}
