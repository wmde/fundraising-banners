import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { ImpressionCount } from '@src/utils/ImpressionCount';

export class VisibleState extends BannerState {
	// TODO: Make this private and add getter
	public stateName: BannerStates = BannerStates.Visible;
	private page: Page;
	private impressionCount: ImpressionCount;

	public constructor( page: Page, impressionCount: ImpressionCount ) {
		super();
		this.page = page;
		this.impressionCount = impressionCount;
		this.canMoveToStates.push( BannerStates.Closed );
	}

	public enter(): Promise<any> {
		// TODO Fire shown events here
		this.impressionCount.incrementImpressionCounts();
		return Promise.resolve();
	}

	public exit(): Promise<any> {
		return Promise.resolve();
	}

	public onResize( space: number ): void {
		this.page.unsetAnimated().setSpace( space );
	}

}
