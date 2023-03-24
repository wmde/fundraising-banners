import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { ImpressionCount } from '@src/utils/ImpressionCount';

export class VisibleState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.Visible;
	private _page: Page;
	private _impressionCount: ImpressionCount;

	public constructor( page: Page, impressionCount: ImpressionCount ) {
		super();
		this._page = page;
		this._impressionCount = impressionCount;

		this.canMoveToStates.push( BannerStates.Closed );
	}

	public enter(): Promise<any> {
		// TODO Fire shown events here
		this._impressionCount.incrementImpressionCounts();
		return Promise.resolve();
	}

	public exit(): Promise<any> {
		return Promise.resolve();
	}

	public onResize( space: number ): void {
		this._page.unsetAnimated().setSpace( space );
	}

}
