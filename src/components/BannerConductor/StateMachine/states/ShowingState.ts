import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';

export class ShowingState extends BannerState {

	stateName: BannerStates = BannerStates.Showing;
	private page: Page;
	private readonly transitionDuration: number;
	private timer: ReturnType<typeof setTimeout>;

	constructor( page: Page, transitionDuration: number ) {
		super();
		this.page = page;
		this.transitionDuration = transitionDuration;
		this.canMoveToStates.push( BannerStates.Visible );
		this.canMoveToStates.push( BannerStates.Closed );
	}

	enter(): Promise<any> {
		this.page.setAnimated()
			.setTransitionDuration( this.transitionDuration )
			.showBanner();

		return new Promise( ( resolve ) => {
			this.timer = setTimeout( () => resolve( true ), this.transitionDuration );
		} );
	}

	exit(): Promise<any> {
		clearTimeout( this.timer );
		return Promise.resolve();
	}

	onResize( space: number ): void {
		this.page.setSpace( space );
	}
}
