import { StepController } from '@src/components/DonationForm/StepController';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { FormModel } from '@src/utils/FormModel/FormModel';
import { StepAction } from '@src/components/DonationForm/StepNavigation';
import { BannerSubmitEvent } from '@src/tracking/events/BannerSubmitEvent';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { AddressTypes } from '@src/utils/FormItemsBuilder/fields/AddressTypes';

export function createSubmittableUpgradeToYearlyAnonymous( formModel: FormModel, stepNameOfLinkClick: string, stepNameOfPreviousPage: string ): StepController {
	return {
		async submit( navigation: StepAction, submitData: Record<string, string> ): Promise<void> {
			formModel.interval.value = submitData.upgradeToYearlyInterval;
			if ( submitData.changeOfAmount ) {
				await navigation.goToStep( stepNameOfLinkClick );
				return;
			}
			if ( !paymentMethodRequiresAddress( formModel ) ) {
				formModel.addressType.value = AddressTypes.ANONYMOUS.value;
			}
			await navigation.submit( new BannerSubmitEvent(
				'UpgradeToYearlyForm',
				formModel.interval.value === Intervals.YEARLY.value ? 'recurring' : 'non-recurring'
			) );
		},
		async previous( navigation: StepAction ): Promise<void> {
			formModel.interval.value = Intervals.ONCE.value;
			await navigation.goToStep( stepNameOfPreviousPage );

		}
	};
}

function paymentMethodRequiresAddress( formModel: FormModel ): boolean {
	return formModel.paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value;
}
