import { FormModel } from '@src/utils/FormModel/FormModel';
import { StepController } from '@src/components/DonationForm/StepController';
import { StepNavigation } from '@src/components/DonationForm/StepNavigation';
import { Validity } from '@src/utils/FormModel/Validity';

export function createSubmittableAddressType( formModel: FormModel, pageIndexForPrevious: string ): StepController {
	return {
		async submit( navigation: StepNavigation ): Promise<void> {
			await navigation.submit( 'submit' );
		},
		async previous( navigation: StepNavigation ): Promise<void> {
			formModel.addressType.value = '';
			formModel.addressTypeValidity.value = Validity.Unset;
			// TODO reset any changes that were potentially made in some Upsell form step before
			await navigation.goToStep( pageIndexForPrevious );
		}
	};
}
