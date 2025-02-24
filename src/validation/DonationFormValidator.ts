import { FormModel } from '@src/utils/FormModel/FormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import { validateAmount } from '@src/validation/validateAmount';
import { validateStringIsNotEmpty } from '@src/validation/validateStringIsNotEmpty';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import { FormValidator } from '@src/validation/FormValidator';

export class DonationFormValidator implements FormValidator {
	private _formModel: FormModel;

	public constructor( formModel: FormModel ) {
		this._formModel = formModel;
	}

	public validate(): boolean {
		this._formModel.intervalValidity.value = validateStringIsNotEmpty( this._formModel.interval.value );
		this._formModel.paymentMethodValidity.value = validateStringIsNotEmpty( this._formModel.paymentMethod.value );
		this._formModel.amountValidity.value = validateAmount(
			this._formModel.amountInCents.value,
			this._formModel.selectedAmount.value,
			this._formModel.customAmount.value
		);

		return this._formModel.intervalValidity.value === Validity.Valid &&
			this._formModel.paymentMethodValidity.value === Validity.Valid &&
			this._formModel.amountValidity.value === AmountValidity.Valid;
	}
}

export function newDonationFormValidator( formModel: FormModel ): FormValidator {
	return new DonationFormValidator( formModel );
}
