import { describe, expect, it, vitest } from 'vitest';
import { ref } from 'vue';
import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStateMachine } from '@src/components/BannerConductor/StateMachine/BannerStateMachine';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

describe( 'BannerStateMachine', function () {

	it( 'exits current state on change', () => {
		const startState = { stateName: BannerStates.Pending, canMoveToStates: [ BannerStates.Showing ], enter: vitest.fn(), exit: vitest.fn() };
		const nextState = { stateName: BannerStates.Showing, enter: vitest.fn() };

		const stateMachine = new BannerStateMachine( ref<BannerState>( startState as unknown as BannerState ) );

		stateMachine.changeState( nextState as unknown as BannerState );

		expect( startState.exit ).toHaveBeenCalledOnce();
		expect( startState.exit ).toHaveBeenCalledWith( BannerStates.Showing );
	} );

	it( 'enters next state on change', async () => {
		const startState = { stateName: BannerStates.Pending, canMoveToStates: [ BannerStates.Showing ], enter: vitest.fn(), exit: vitest.fn() };
		const nextState = { stateName: BannerStates.Showing, enter: vitest.fn() };

		const currentState = ref<BannerState>( startState as unknown as BannerState );
		const stateMachine = new BannerStateMachine( currentState );

		await stateMachine.changeState( nextState as unknown as BannerState );

		expect( nextState.enter ).toHaveBeenCalledOnce();
		expect( nextState.enter ).toHaveBeenCalledWith( BannerStates.Pending );
		expect( currentState.value ).toEqual( nextState );
	} );

	it( 'throws an error if change is called before start', async () => {
		const currentState = ref<BannerState>( null );
		const stateMachine = new BannerStateMachine( currentState );
		const state = { enter: vitest.fn() };

		await expect( () => stateMachine.changeState( state as unknown as BannerState ) ).rejects.toThrowError();
	} );

	it( 'does nothing if state cannot move to next state', async () => {
		const startState = { stateName: BannerStates.Pending, canMoveToStates: [ BannerStates.Closed ], enter: vitest.fn(), exit: vitest.fn() };
		const nextState = { stateName: BannerStates.Showing, enter: vitest.fn() };

		const currentState = ref<BannerState>( startState as unknown as BannerState );
		const stateMachine = new BannerStateMachine( currentState );

		await stateMachine.changeState( nextState as unknown as BannerState );

		expect( startState.exit ).not.toHaveBeenCalled();
		expect( nextState.enter ).not.toHaveBeenCalled();
		expect( currentState.value ).toEqual( startState );
	} );
} );
