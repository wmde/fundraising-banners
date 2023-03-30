import { FormModel } from '@src/utils/FormModel/FormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import { validateAmount } from '@src/validation/validateAmount';
import { validateStringIsNotEmpty } from '@src/validation/validateStringIsNotEmpty';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';

export function formFieldsAreValid( formModel: FormModel ): boolean {
	formModel.intervalValidity.value = validateStringIsNotEmpty( formModel.interval.value );
	formModel.paymentMethodValidity.value = validateStringIsNotEmpty( formModel.paymentMethod.value );
	formModel.amountValidity.value = validateAmount(
		formModel.numericAmount.value,
		formModel.selectedAmount.value,
		formModel.customAmount.value
	);

	return formModel.intervalValidity.value === Validity.Valid &&
		formModel.paymentMethodValidity.value === Validity.Valid &&
		formModel.amountValidity.value === AmountValidity.Valid;
}
