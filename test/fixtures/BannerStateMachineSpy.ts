import { BannerStateMachine } from '@src/components/BannerConductor/StateMachine/BannerStateMachine';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';
import { ReactiveProperty } from '@src/domain/StateMachine/ReactiveProperty';
import { StateMachine } from '@src/domain/StateMachine/StateMachine';

export class BannerStateMachineSpy extends BannerStateMachine {
	public statesCalled: BannerStates[] = [];

	public async changeState( state: BannerState ): Promise<any> {
		this.statesCalled.push( state.stateName );
		return super.changeState( state );
	}
}

export let bannerStateMachineSpy: BannerStateMachineSpy;

export function newBannerStateMachineSpy( stateRef: ReactiveProperty<BannerState> ): StateMachine<BannerState> {
	bannerStateMachineSpy = new BannerStateMachineSpy( stateRef );
	return bannerStateMachineSpy;
}
