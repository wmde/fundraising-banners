import { describe, expect, it, vitest } from 'vitest';
import { ref } from 'vue';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStateMachine } from '@src/components/BannerConductor/StateMachine/BannerStateMachine';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

describe( 'BannerStateMachine', function () {
	it( 'enters initial state on start', () => {
		const currentState = ref<BannerState>( null );
		const stateMachine = new BannerStateMachine( currentState );
		const state = { enter: vitest.fn() };

		stateMachine.StartWithState( state as unknown as BannerState );

		expect( state.enter ).toHaveBeenCalledOnce();
		expect( state.enter ).toHaveBeenCalledWith( null );
		expect( currentState.value ).toEqual( state );
	} );

	it( 'exits current state on change', () => {
		const stateMachine = new BannerStateMachine( ref<BannerState>( null ) );

		const startState = { stateName: BannerStates.Pending, canMoveToStates: [ BannerStates.Showing ], enter: vitest.fn(), exit: vitest.fn() };
		const nextState = { stateName: BannerStates.Showing, enter: vitest.fn() };

		stateMachine.StartWithState( startState as unknown as BannerState );
		stateMachine.ChangeState( nextState as unknown as BannerState );

		expect( startState.exit ).toHaveBeenCalledOnce();
		expect( startState.exit ).toHaveBeenCalledWith( BannerStates.Showing );
	} );

	it( 'enters next state on change', async () => {
		const currentState = ref<BannerState>( null );
		const stateMachine = new BannerStateMachine( currentState );

		const startState = { stateName: BannerStates.Pending, canMoveToStates: [ BannerStates.Showing ], enter: vitest.fn(), exit: vitest.fn() };
		const nextState = { stateName: BannerStates.Showing, enter: vitest.fn() };

		await stateMachine.StartWithState( startState as unknown as BannerState );
		await stateMachine.ChangeState( nextState as unknown as BannerState );

		expect( nextState.enter ).toHaveBeenCalledOnce();
		expect( nextState.enter ).toHaveBeenCalledWith( BannerStates.Pending );
		expect( currentState.value ).toEqual( nextState );
	} );

	it( 'throws an error if change is called before start', async () => {
		const currentState = ref<BannerState>( null );
		const stateMachine = new BannerStateMachine( currentState );
		const state = { enter: vitest.fn() };

		await expect( () => stateMachine.ChangeState( state as unknown as BannerState ) ).rejects.toThrowError();
	} );

	it( 'does nothing if state cannot move to next state', async () => {
		const currentState = ref<BannerState>( null );
		const stateMachine = new BannerStateMachine( currentState );

		const startState = { stateName: BannerStates.Pending, canMoveToStates: [ BannerStates.Closed ], enter: vitest.fn(), exit: vitest.fn() };
		const nextState = { stateName: BannerStates.Showing, enter: vitest.fn() };

		await stateMachine.StartWithState( startState as unknown as BannerState );
		await stateMachine.ChangeState( nextState as unknown as BannerState );

		expect( startState.exit ).not.toHaveBeenCalled();
		expect( nextState.enter ).not.toHaveBeenCalled();
		expect( currentState.value ).toEqual( startState );
	} );
} );
