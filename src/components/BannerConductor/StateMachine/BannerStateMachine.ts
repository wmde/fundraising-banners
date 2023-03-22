import { StateMachine } from '@src/utils/StateMachine/StateMachine';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { ReactiveProperty } from '@src/utils/ReactiveProperty';

export class BannerStateMachine implements StateMachine<BannerState> {
	public currentState: ReactiveProperty<BannerState>;

	constructor( stateRef: ReactiveProperty<BannerState> ) {
		this.currentState = stateRef;
		this.currentState.value.enter( null ).then( ()=>{} );
	}

	async changeState( state: BannerState ): Promise<any> {

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
