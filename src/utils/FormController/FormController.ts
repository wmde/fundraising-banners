import { FormSubmitData } from '@src/utils/FormController/FormSubmitData';

/**
 * Responsible for which step of the form to show and firing the final submission
 */

export interface FormController {
	submit( step: FormSubmitData ): void;
	next(): void;
	previous(): void;
	goToStep( step: number ): void;
}
