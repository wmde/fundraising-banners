import { FormModel } from '@src/utils/FormModel/FormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import { validateAmount } from '@src/validation/validateAmount';
import { validateStringIsNotEmpty } from '@src/validation/validateStringIsNotEmpty';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';

export class DonationFormValidator {
	private _formModel: FormModel;

	public constructor( formModel: FormModel ) {
		this._formModel = formModel;
	}

	public isValid(): boolean {
		this._formModel.intervalValidity.value = validateStringIsNotEmpty( this._formModel.interval.value );
		this._formModel.paymentMethodValidity.value = validateStringIsNotEmpty( this._formModel.paymentMethod.value );
		this._formModel.amountValidity.value = validateAmount( this._formModel.numericAmount.value );

		return this._formModel.intervalValidity.value === Validity.Valid &&
			this._formModel.paymentMethodValidity.value === Validity.Valid &&
			this._formModel.amountValidity.value === AmountValidity.Valid;
	}
}
