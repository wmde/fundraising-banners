import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';

/**
 * Responsible for which step of the form to show and firing the final submission
 *
 * @deprecated Should be removed when all banners implement the form step controllers
 */
export interface FormController {
	submitStep( step: FormSubmitData ): void;
	previous( step: FormSubmitData ): void;

	onNext( callback: () => void ): void;
	onPrevious( callback: () => void ): void;
	onGoToStep( callback: ( step: number ) => void ): void;
	onSubmit( callback: () => void ): void;
}
