import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';

export class VisibleState extends BannerState {
	// TODO: Make this private and add getter
	public stateName: BannerStates = BannerStates.Visible;
	private page: Page;

	public constructor( page: Page ) {
		super();
		this.page = page;
		this.canMoveToStates.push( BannerStates.Closed );
	}

	public enter(): Promise<any> {
		// Fire shown events here
		return Promise.resolve();
	}

	public exit(): Promise<any> {
		return Promise.resolve();
	}

	public onResize( space: number ): void {
		this.page.unsetAnimated().setSpace( space );
	}

}
