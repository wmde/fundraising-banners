import { FormController } from '@src/utils/FormController/FormController';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';
import { FormModel } from '@src/utils/FormModel/FormModel';
import { Intervals } from '@src/utils/FormItemsBuilder/fields/Intervals';
import { PaymentMethods } from '@src/utils/FormItemsBuilder/fields/PaymentMethods';
import { computed, Ref } from 'vue';

const MAIN_DONATION_INDEX = 0;
const UPGRADE_TO_YEARLY_INDEX = 1;
const NEW_CUSTOM_AMOUNT_INDEX = 2;
const ADDRESS_TYPES_INDEX = 3;

type FormIsActive = [ boolean, boolean, boolean, boolean ];

export class FormControllerVar implements FormController {

	private readonly _formModel: FormModel;

	private _nextCallback: () => void;
	private _previousCallback: () => void;
	private _goToStepCallback: ( step: number ) => void;
	private _submitCallback: ( tracking?: string ) => void;
	private _shouldAskForCustomAmount: boolean = false;
	private _allowedForms: Ref<FormIsActive>;

	// TODO array for the extra data

	public constructor( formModel: FormModel ) {
		this._formModel = formModel;
		this._allowedForms = computed<FormIsActive>( () => [
			true,
			this.shouldSkipUpsell(),
			this.shouldAskForCustomAmount(),
			this.shouldAskForAddress()
		] );

	}

	public submitStep( submitData: FormSubmitData ): void {
		const { interval, paymentMethod } = this._formModel;

		// TODO remove switch statement, instead do the following steps:
		//  1. store extra data from step in array for the current step
		//  2. check for the next "active" form (using _allowedForms)
		//  3a. If an active form was found, go to the index of that form
		//  3b. If no active form was found, resolve the extra data to value changes in _formModel, then call submit callback

		switch ( submitData.pageIndex ) {
			case MAIN_DONATION_INDEX:
				if ( paymentMethod.value === PaymentMethods.DIRECT_DEBIT.value && this.shouldSkipUpsell() ) {
					this._submitCallback();
				}
				if ( this.shouldSkipUpsell() ) {
					this._goToStepCallback( ADDRESS_TYPES_INDEX );
					// TODO tracking
					return;
				}
				this._nextCallback();
				break;
			case UPGRADE_TO_YEARLY_INDEX:
				interval.value = submitData.extraData.upgradeToYearlyInterval;
				this._goToStepCallback( ADDRESS_TYPES_INDEX );
				// TODO tracking
				break;
			case NEW_CUSTOM_AMOUNT_INDEX:
				interval.value = Intervals.YEARLY.value;
				this._formModel.customAmount.value = submitData.extraData.newCustomAmount;
				this._nextCallback();
				// TODO tracking
				break;
			case ADDRESS_TYPES_INDEX:
				// TODO tracking
				this._submitCallback();
				break;
		}
	}

	private shouldSkipUpsell(): boolean {
		return this._formModel.interval.value !== Intervals.ONCE.value ||
			this._formModel.paymentMethod.value === PaymentMethods.SOFORT.value;
	}

	public next(): void {
		// TOOD add step parameter to be able to store intermediate results
		// TODO Delegate to submit step algorithm, storing extra data as well
		this._nextCallback();
	}

	public previous( step: FormSubmitData ): void {
		// TODO Drop switch statement, instead use the following steps:
		//  1. look though _allowedForms until you find a "true" (active) one. This will be the new active step
		//  2. drop all stored extra data between current step and new active step
		//  3. go to new active step

		switch ( step.pageIndex ) {
			case UPGRADE_TO_YEARLY_INDEX:
				this._formModel.interval.value = Intervals.ONCE.value;
				break;
			case ADDRESS_TYPES_INDEX:
				// TODO go to previous page
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

	private shouldAskForCustomAmount(): boolean {
		return this._shouldAskForCustomAmount;
	}

	private shouldAskForAddress(): boolean {
		// TODO check formdata
		return false;
	}
}
