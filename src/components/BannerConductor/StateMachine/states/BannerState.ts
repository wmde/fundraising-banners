import { StateMachineState } from '@src/utils/StateMachine/StateMachineState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

export abstract class BannerState implements StateMachineState<BannerStates> {
	public abstract stateName: BannerStates;
	public canMoveToStates: BannerStates[] = [];

	abstract enter( lastState: BannerStates ): Promise<any>;

	abstract exit( nextState: BannerStates ): Promise<any>;

	abstract onResize( space: number ): void;
}
