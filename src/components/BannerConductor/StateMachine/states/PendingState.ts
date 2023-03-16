import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';

export class PendingState extends BannerState {

	stateName: BannerStates = BannerStates.Pending;
	private page: Page;
	private readonly bannerHeight: number;
	private readonly delay: number;
	private timer: ReturnType<typeof setTimeout>;

	constructor( page: Page, bannerHeight: number, delay: number ) {
		super();

		this.page = page;
		this.bannerHeight = bannerHeight;
		this.delay = delay;

		this.canMoveToStates.push( BannerStates.Showing );
		this.canMoveToStates.push( BannerStates.Closed );
		this.canMoveToStates.push( BannerStates.NotShown );
		this.canMoveToStates.push( BannerStates.SizeIssue );
	}

	enter(): Promise<any> {
		this.page.setSpace( this.bannerHeight );

		return new Promise( ( resolve ) => {
			this.timer = setTimeout( () => resolve( true ), this.delay );
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
