import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';

export class VisibleState extends BannerState {
	stateName: BannerStates = BannerStates.Visible;
	private page: Page;

	constructor( page: Page ) {
		super();
		this.page = page;
		this.canMoveToStates.push( BannerStates.Closed );
	}

	enter(): Promise<any> {
		// Fire shown events here
		return Promise.resolve();
	}

	exit(): Promise<any> {
		return Promise.resolve();
	}

	onResize( space: number ): void {
		this.page.setSpace( space );
	}

}
