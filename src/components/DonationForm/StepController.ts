import { StepNavigation } from '@src/components/DonationForm/StepNavigation';

export interface StepController {
	submit: ( navigation: StepNavigation, submitData: Record<string, string> ) => Promise<void>;
	previous: ( navigation: StepNavigation, submitData: Record<string, string> ) => Promise<void>;
}
