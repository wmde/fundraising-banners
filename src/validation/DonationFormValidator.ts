import type { FormModel } from '@src/utils/FormModel/FormModel';
import { Validity } from '@src/utils/FormModel/Validity';
import { validateAmount } from '@src/validation/validateAmount';
import { validateStringIsNotEmpty } from '@src/validation/validateStringIsNotEmpty';
import { AmountValidity } from '@src/utils/FormModel/AmountValidity';
import type { FormValidator } from '@src/validation/FormValidator';

export class DonationFormValidator implements FormValidator {
	private _formModel: FormModel;

	public constructor( formModel: FormModel ) {
		this._formModel = formModel;
	}

	public validateAmount(): boolean {
		this._formModel.amountValidity.value = validateAmount(
			this._formModel.amountInCents.value,
			this._formModel.selectedAmount.value,
			this._formModel.customAmount.value
		);
		return this._formModel.amountValidity.value === AmountValidity.Valid;
	}

	public validatePaymentMethod(): boolean {
		this._formModel.paymentMethodValidity.value = validateStringIsNotEmpty( this._formModel.paymentMethod.value );
		return this._formModel.paymentMethodValidity.value === Validity.Valid;
	}

	public validateInterval(): boolean {
		this._formModel.intervalValidity.value = validateStringIsNotEmpty( this._formModel.interval.value );
		return this._formModel.intervalValidity.value === Validity.Valid;
	}

	public validate(): boolean {
		const intervalIsValid = this.validateInterval();
		const paymentMethodIsValid = this.validatePaymentMethod();
		const amountIsValid = this.validateAmount();

		return intervalIsValid && paymentMethodIsValid && amountIsValid;
	}
}

export function newDonationFormValidator( formModel: FormModel ): FormValidator {
	return new DonationFormValidator( formModel );
}
