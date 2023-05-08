import { StepController } from '@src/components/DonationForm/StepController';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { FormModel } from '@src/utils/FormModel/FormModel';
import { StepNavigation } from '@src/components/DonationForm/StepNavigation';

export function createIntermediateUpgradeToYearly(
	formModel: FormModel,
	stepNameOfLinkClick: string,
	stepNameOfNextStep: string,
	stepNameOfPreviousPage: string
): StepController {
	return {
		async submit( navigation: StepNavigation, submitData: Record<string, string> ): Promise<void> {
			formModel.interval.value = submitData.upgradeToYearlyInterval;
			if ( submitData.changeOfAmount ) {
				await navigation.goToStep( stepNameOfLinkClick );
				return;
			}
			await navigation.goToStep( stepNameOfNextStep );
		},
		async previous( navigation: StepNavigation ): Promise<void> {
			formModel.interval.value = Intervals.ONCE.value;
			await navigation.goToStep( stepNameOfPreviousPage );
		}
	};
}
