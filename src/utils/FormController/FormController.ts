import { FormStep } from '@src/utils/FormController/FormStep';

/**
 * Responsible for which step of the form to show and firing the final submission
 */

export interface FormController {
	submit( step: FormStep ): void;
	next(): void;
	previous(): void;
	goToStep( step: number ): void;
}
