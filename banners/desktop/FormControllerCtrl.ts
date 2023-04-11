import { FormController } from '@src/utils/FormController/FormController';
import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';
import { FormModel } from '@src/utils/FormModel/FormModel';

export class FormControllerCtrl implements FormController {

	private _formModel: FormModel;
	private _currentStep: number;

	private _nextCallback: () => void;
	private _previousCallback: () => void;
	private _goToStepCallback: ( step: number ) => void;
	private _submitCallback: () => void;

	public constructor( formModel: FormModel ) {
		this._formModel = formModel;
		this._currentStep = 1;
	}

	public submitStep( step: FormSubmitData ): void {
		this._currentStep = step.pageNumber;
	}

	public next(): void {
		this._currentStep++;
	}

	public previous(): void {
		this._currentStep--;
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
	public onSubmit( callback: () => void ): void {
		this._submitCallback = callback;
	}
}
