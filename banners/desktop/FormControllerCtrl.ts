import { FormController } from '@src/utils/FormController/FormController';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';
import { FormModel } from '@src/utils/FormModel/FormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

const MAIN_DONATION_INDEX = 0;
const UPGRADE_TO_YEARLY_INDEX = 1;
const NEW_CUSTOM_AMOUNT_INDEX = 2;

export class FormControllerCtrl implements FormController {

	private readonly _formModel: FormModel;

	private _nextCallback: () => void;
	private _previousCallback: () => void;
	private _goToStepCallback: ( step: number ) => void;
	private _submitCallback: ( tracking?: string ) => void;

	public constructor( formModel: FormModel ) {
		this._formModel = formModel;
	}

	public submitStep( step: FormSubmitData ): void {
		const { interval, paymentMethod } = this._formModel;

		switch ( step.pageIndex ) {
			case MAIN_DONATION_INDEX:
				if ( interval.value !== Intervals.ONCE.value || paymentMethod.value === PaymentMethods.SOFORT.value ) {
					this._submitCallback();
					return;
				}
				this._nextCallback();
				break;
			case UPGRADE_TO_YEARLY_INDEX:
				interval.value = step.extraData.upgradeToYearlyInterval;
				this._submitCallback( interval.value === Intervals.YEARLY.value ? 'submit-recurring' : 'submit-non-recurring' );
				break;
			case NEW_CUSTOM_AMOUNT_INDEX:
				interval.value = Intervals.YEARLY.value;
				this._submitCallback( 'submit-different-amount' );
				break;
		}
	}

	public next(): void {
		this._nextCallback();
	}

	public previous( step: FormSubmitData ): void {
		switch ( step.pageIndex ) {
			case UPGRADE_TO_YEARLY_INDEX:
				this._formModel.interval.value = Intervals.ONCE.value;
				break;
		}
		this._previousCallback();
	}

	public onNext( callback: () => void ): void {
		this._nextCallback = callback;
	}
	public onPrevious( callback: () => void ): void {
		this._previousCallback = callback;
	}
	public onGoToStep( callback: ( step: number ) => void ): void {
		this._goToStepCallback = callback;
	}
	public onSubmit( callback: ( tracking?: string ) => void ): void {
		this._submitCallback = callback;
	}
}
