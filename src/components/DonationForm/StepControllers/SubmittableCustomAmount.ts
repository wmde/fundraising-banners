import { FormModel } from '@src/utils/FormModel/FormModel';
import { StepController } from '@src/components/DonationForm/StepController';
import { StepNavigation } from '@src/components/DonationForm/StepNavigation';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';

export function createSubmittableCustomAmount( formModel: FormModel, stepNamePrevious: string ): StepController {
	return {
		async submit( navigation: StepNavigation, submitData: Record<string, string> ): Promise<void> {
			formModel.interval.value = Intervals.YEARLY.value;
			formModel.customAmount.value = submitData.newCustomAmount;
			await navigation.submit( 'submit-different-amount' );
		},
		async previous( navigation: StepNavigation ): Promise<void> {
			await navigation.goToStep( stepNamePrevious );
		}

	};
}
