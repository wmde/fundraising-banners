import { ReactiveProperty } from '@src/utils/ReactiveProperty';

export interface StateMachine<T> {
	currentState: ReactiveProperty<T>;
	changeState( state: T ): Promise<any>;
}
