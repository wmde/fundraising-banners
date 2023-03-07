import { BannerState } from '@src/components/BannerConductor/StateMachine/states/BannerState';
import { BannerStates } from '@src/components/BannerConductor/StateMachine/BannerStates';

export class NotShownState extends BannerState {
	stateName: BannerStates = BannerStates.NotShown;

	enter(): Promise<any> {
		// Throw events
		return Promise.resolve( true );
	}

	exit(): Promise<any> {
		return Promise.resolve( true );
	}

	onResize(): void {
		// Do nothing
	}
}
