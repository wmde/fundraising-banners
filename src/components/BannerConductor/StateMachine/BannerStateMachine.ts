import { StateMachine } from '@src/utils/StateMachine/StateMachine';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { Ref } from 'vue';

export class BannerStateMachine implements StateMachine<BannerState> {
	public currentState: Ref<BannerState>;

	constructor( stateRef: Ref<BannerState> ) {
		this.currentState = stateRef;
	}

	async StartWithState( state: BannerState ): Promise<any> {
		this.currentState.value = state;
		return await this.currentState.value.enter( null );
	}

	async ChangeState( state: BannerState ): Promise<any> {

		if ( this.currentState.value === null ) {
			throw new Error( 'State machine must be started with an initial state' );
		}

		if ( this.currentState.value.canMoveToStates.includes( state.stateName ) ) {
			await this.currentState.value.exit( state.stateName );
			const lastStateType = this.currentState.value.stateName;
			this.currentState.value = state;
			await state.enter( lastStateType );
		}
	}
}
