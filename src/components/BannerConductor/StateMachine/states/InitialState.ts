import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

export class InitialState extends BannerState {
	stateName: BannerStates = BannerStates.Initial;

	constructor() {
		super();
		this.canMoveToStates.push( BannerStates.Pending );
	}

	enter(): Promise<any> {
		return Promise.resolve( true );
	}
	exit(): Promise<any> {
		return Promise.resolve( true );
	}

	onResize(): void {

	}

}
