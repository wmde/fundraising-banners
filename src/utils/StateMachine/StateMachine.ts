import { Ref } from 'vue';

export interface StateMachine<T> {
	currentState: Ref<T>;
	changeState( state: T ): Promise<any>;
}
