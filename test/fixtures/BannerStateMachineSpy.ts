import { BannerStateMachine } from '@src/components/BannerConductor/StateMachine/BannerStateMachine';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

export class BannerStateMachineSpy extends BannerStateMachine {
	public statesCalled: BannerStates[] = [];

	public async changeState( state: BannerState ): Promise<any> {
		this.statesCalled.push( state.stateName );
		return super.changeState( state );
	}
}
