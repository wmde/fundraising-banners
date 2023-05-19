import { ReactiveProperty } from '@src/domain/StateMachine/ReactiveProperty';

export interface StateMachine<T> {
	currentState: ReactiveProperty<T>;
	changeState( state: T ): Promise<any>;
}
