import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

export class ClosedState extends BannerState {
	stateName: BannerStates = BannerStates.Closed;

	enter(): Promise<any> {
		// fire events
		return Promise.resolve();
	}

	exit(): Promise<any> {
		return Promise.resolve();
	}

	onResize(): void {
	}

}
