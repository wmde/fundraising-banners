import { StepAction } from '@src/components/DonationForm/StepNavigation';

export interface StepController {
	submit: ( navigation: StepAction, submitData: Record<string, string> ) => Promise<void>;
	previous: ( navigation: StepAction, submitData: Record<string, string> ) => Promise<void>;
}
