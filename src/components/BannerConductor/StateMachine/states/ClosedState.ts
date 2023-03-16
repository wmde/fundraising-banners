import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { Page } from '@src/page/Page';
import { CloseSources } from '@src/tracking/CloseSources';
import { Tracker } from '@src/tracking/Tracker';
import { CloseEvent } from '@src/tracking/events/CloseEvent';

export class ClosedState extends BannerState {
	stateName: BannerStates = BannerStates.Closed;
	private page: Page;
	private source: CloseSources;
	private tracker: Tracker;

	constructor( source: CloseSources, page: Page, tracker: Tracker ) {
		super();
		this.page = page;
		this.source = source;
		this.tracker = tracker;
	}

	enter(): Promise<any> {
		this.tracker.trackEvent( new CloseEvent( this.source ) );
		this.page.unsetAnimated()
			.setSpace( 0 );
		// TODO notify page that banner has closed
		return Promise.resolve();
	}

	exit(): Promise<any> {
		return Promise.resolve();
	}

	onResize(): void {
	}

}
