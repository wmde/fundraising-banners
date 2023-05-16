import { StepController } from '@src/components/DonationForm/StepController';
import { StepAction } from '@src/components/DonationForm/StepNavigation';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';

export function createSubmittableMainDonationFormSinglePage(): StepController {
	return {
		async submit( navigation: StepAction ): Promise<void> {
			await navigation.submit( new BannerSubmitEvent( 'MainDonationForm' ) );
		},
		async previous(): Promise<void> {
			return Promise.reject( 'Single page forms cannot go to previous. This should never happen.' );
		}
	};
}
