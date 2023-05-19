export interface StateMachineState<T> {
	enter( lastState: T ): Promise<any>;
	exit( nextState: T ): Promise<any>;
}
