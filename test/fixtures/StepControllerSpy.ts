import { StepController } from '@src/components/DonationForm/StepController';
import { StepAction } from '@src/components/DonationForm/StepNavigation';
import { TrackingEvent } from '@src/tracking/TrackingEvent';

export class StepControllerSpy implements StepController {
	private _navigation: StepAction;
	public submitData: Record<string, string>;
	public submitWasCalled: boolean = false;
	public previousWasCalled: boolean = false;

	public submit( navigation: StepAction, submitData: Record<string, string> ): Promise<void> {
		this._navigation = navigation;
		this.submitData = submitData;
		this.submitWasCalled = true;
		return Promise.resolve( undefined );
	}

	public previous(): Promise<void> {
		this.previousWasCalled = true;
		return Promise.resolve( undefined );
	}

	public async callSubmit( trackingEvent: TrackingEvent<void> ): Promise<void> {
		return this._navigation.submit( trackingEvent );
	}

	public async callGoToStep( stepName: string ): Promise<void> {
		return this._navigation.goToStep( stepName );
	}
}
