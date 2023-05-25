import { TrackingEvent } from '@src/tracking/TrackingEvent';

export interface StepAction {
	goToStep( pageName: string ): Promise<void>;
	submit( eventData: TrackingEvent ): Promise<void>;
}
