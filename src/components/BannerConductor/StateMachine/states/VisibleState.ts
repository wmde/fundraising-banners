import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import type { Page } from '@src/page/Page';
import type { ImpressionCount } from '@src/utils/ImpressionCount';
import type { Tracker } from '@src/tracking/Tracker';
import { ShownEvent } from '@src/tracking/events/ShownEvent';
import type { TrackingFeatureName } from '@src/tracking/TrackingEvent';
import FallbackBannerShownEvent from '@src/tracking/events/FallbackBannerShownEvent';

export class VisibleState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.Visible;
	private readonly _shownEventFeature: TrackingFeatureName;
	private _page: Page;
	private _impressionCount: ImpressionCount;
	private _tracker: Tracker;
	private readonly _bannerHeight: number;

	public constructor(
		shownEventFeature: TrackingFeatureName,
		page: Page,
		impressionCount: ImpressionCount,
		tracker: Tracker,
		bannerHeight: number
	) {
		super();
		this._shownEventFeature = shownEventFeature;
		this._page = page;
		this._impressionCount = impressionCount;
		this._tracker = tracker;
		this._bannerHeight = bannerHeight;

		this.canMoveToStates.push( BannerStates.Closed );
		this.canMoveToStates.push( BannerStates.Submitted );
	}

	public enter(): Promise<any> {
		if ( this._shownEventFeature === 'FallbackBanner' ) {
			this._tracker.trackEvent( new FallbackBannerShownEvent( {
				bannerHeight: this._bannerHeight,
				viewportWidth: window.innerWidth,
				viewportHeight: window.innerHeight
			} ) );
		} else {
			this._tracker.trackEvent( new ShownEvent( this._shownEventFeature ) );
		}
		this._impressionCount.incrementImpressionCounts();
		return Promise.resolve();
	}

	public exit(): Promise<any> {
		return Promise.resolve();
	}

	public onResize( space: number ): void {
		this._page.unsetAnimated().setSpace( space );
	}

	public onContentChanged( space: number ): void {
		this._page.unsetAnimated().setSpace( space );
	}
}
