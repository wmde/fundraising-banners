import { FormModel } from '@src/utils/FormModel/FormModel';
import { StepController } from '@src/components/DonationForm/StepController';
import { StepAction } from '@src/components/DonationForm/StepNavigation';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';

export function createSubmittableCustomAmount( formModel: FormModel, stepNamePrevious: string ): StepController {
	return {
		async submit( navigation: StepAction, submitData: Record<string, string> ): Promise<void> {
			formModel.interval.value = Intervals.YEARLY.value;
			formModel.customAmount.value = submitData.newCustomAmount;
			await navigation.submit( new BannerSubmitEvent( 'CustomAmountForm' ) );
		},
		async previous( navigation: StepAction ): Promise<void> {
			await navigation.goToStep( stepNamePrevious );
		}

	};
}
