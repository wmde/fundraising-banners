import { Ref } from 'vue';

export interface StateMachine<T> {
	currentState: Ref<T>;
	StartWithState( state: T ): Promise<any>;
	ChangeState( state: T ): Promise<any>;
}
