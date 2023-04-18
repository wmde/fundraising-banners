import { FormController } from '@src/utils/FormController/FormController';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';
import { FormModel } from '@src/utils/FormModel/FormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';

export const MAIN_DONATION_INDEX = 0;
export const UPGRADE_TO_YEARLY_INDEX = 1;
export const ADDRESS_TYPES_INDEX = 2;

export class FormControllerVar implements FormController {

	private readonly _formModel: FormModel;

	private _nextCallback: () => void;
	private _previousCallback: () => void;
	private _goToStepCallback: ( step: number ) => void;
	private _submitCallback: ( tracking?: string ) => void;

	public constructor( formModel: FormModel ) {
		this._formModel = formModel;
	}

	public submitStep( submitData: FormSubmitData ): void {
		const { interval, paymentMethod, addressType } = this._formModel;

		switch ( submitData.pageIndex ) {
			case MAIN_DONATION_INDEX:
				if ( interval.value !== Intervals.ONCE.value || paymentMethod.value === PaymentMethods.SOFORT.value ) {
					this._goToStepCallback( ADDRESS_TYPES_INDEX );
					return;
				}
				this._nextCallback();
				break;
			case UPGRADE_TO_YEARLY_INDEX:
				interval.value = submitData.extraData.upgradeToYearlyInterval;
				this._nextCallback();
				break;
			case ADDRESS_TYPES_INDEX:
				// TODO tracking?
				this._submitCallback();
				break;
		}
	}

	public next( step: FormSubmitData ): void {
		switch ( step.pageIndex ) {
			case UPGRADE_TO_YEARLY_INDEX:
				this._formModel.interval.value = Intervals.YEARLY.value;
				this._goToStepCallback( MAIN_DONATION_INDEX );
				return;
		}
		this._nextCallback();
	}

	public previous( step: FormSubmitData ): void {
		switch ( step.pageIndex ) {
			case UPGRADE_TO_YEARLY_INDEX:
				this._formModel.interval.value = Intervals.ONCE.value;
				break;
			case ADDRESS_TYPES_INDEX:
				this._goToStepCallback( MAIN_DONATION_INDEX );
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
