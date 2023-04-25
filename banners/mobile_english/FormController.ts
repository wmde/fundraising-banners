import { FormController as FormControllerInterface } from '@src/utils/FormController/FormController';

export const MAIN_DONATION_INDEX = 0;

export class FormController implements FormControllerInterface {

	private _nextCallback: () => void;
	private _previousCallback: () => void;
	private _goToStepCallback: ( step: number ) => void;
	private _submitCallback: ( tracking?: string ) => void;

	public submitStep(): void {
		this._submitCallback();
	}

	public next(): void {
		this._nextCallback();
	}

	public previous(): void {
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
