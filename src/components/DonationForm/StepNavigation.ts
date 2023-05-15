import { EventData } from '@src/tracking/EventData';

export interface StepAction {
	goToStep( pageName: string ): Promise<void>;
	submit( eventData: EventData ): Promise<void>;
}
