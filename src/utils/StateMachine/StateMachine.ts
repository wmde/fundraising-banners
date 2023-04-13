import { ReactiveProperty } from '@src/domain/ReactiveProperty';

export interface StateMachine<T> {
	currentState: ReactiveProperty<T>;
	changeState( state: T ): Promise<any>;
}
