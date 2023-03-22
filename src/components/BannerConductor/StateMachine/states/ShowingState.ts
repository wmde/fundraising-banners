import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';

export class ShowingState extends BannerState {
	// TODO: Make this private and add getter
	public stateName: BannerStates = BannerStates.Showing;
	private page: Page;
	private readonly transitionDuration: number;
	private timer: ReturnType<typeof setTimeout>;

	public constructor( page: Page, transitionDuration: number ) {
		super();
		this.page = page;
		this.transitionDuration = transitionDuration;
		this.canMoveToStates.push( BannerStates.Visible );
		this.canMoveToStates.push( BannerStates.Closed );
	}

	public enter(): Promise<any> {
		this.page.setAnimated()
			.setTransitionDuration( this.transitionDuration )
			.showBanner();

		return new Promise( ( resolve ) => {
			this.timer = setTimeout( () => resolve( true ), this.transitionDuration );
		} );
	}

	public exit(): Promise<any> {
		clearTimeout( this.timer );
		return Promise.resolve();
	}

	public onResize( space: number ): void {
		this.page.unsetAnimated().setSpace( space );
	}
}
