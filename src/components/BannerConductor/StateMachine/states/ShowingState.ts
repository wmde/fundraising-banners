import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';

export class ShowingState extends BannerState {
	public readonly stateName: BannerStates = BannerStates.Showing;
	private _timer: ReturnType<typeof setTimeout>;
	private _page: Page;
	private readonly _transitionDuration: number;

	public constructor( page: Page, transitionDuration: number ) {
		super();
		this._page = page;
		this._transitionDuration = transitionDuration;

		this.canMoveToStates.push( BannerStates.Visible );
		this.canMoveToStates.push( BannerStates.Closed );
	}

	public enter(): Promise<any> {
		this._page.setAnimated()
			.setTransitionDuration( this._transitionDuration )
			.showBanner();

		return new Promise( ( resolve ) => {
			this._timer = setTimeout( () => resolve( true ), this._transitionDuration );
		} );
	}

	public exit(): Promise<any> {
		clearTimeout( this._timer );
		return Promise.resolve();
	}

	public onResize( space: number ): void {
		this._page.unsetAnimated().setSpace( space );
	}

	public onContentChanged( space: number ): void {
		this._page.unsetAnimated().setSpace( space );
	}
}
