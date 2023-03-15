import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';

export class ClosedState extends BannerState {
	stateName: BannerStates = BannerStates.Closed;
	page: Page;

	constructor( page: Page ) {
		super();
		this.page = page;
	}

	enter(): Promise<any> {
		// TODO: log events
		this.page.unsetAnimated();
		this.page.setSpace( 0 );
		return Promise.resolve();
	}

	exit(): Promise<any> {
		return Promise.resolve();
	}

	onResize(): void {
	}

}
