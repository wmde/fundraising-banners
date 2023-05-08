import { StepController } from '@src/components/DonationForm/StepController';
import { StepNavigation } from '@src/components/DonationForm/StepNavigation';

export function createSubmittableSinglePage(): StepController {
	return {
		async submit( navigation: StepNavigation ): Promise<void> {
			await navigation.submit( 'submit' );
		},
		async previous(): Promise<void> {
			return Promise.reject( 'Single page forms cannot go to previous. This should never happen.' );
		}
	};
}
