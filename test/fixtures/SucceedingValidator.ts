import type { FormValidator } from '@src/validation/FormValidator';

const succeedingValidator: FormValidator = {
	validate(): boolean {
		return true;
	}, validateAmount(): boolean {
		return true;
	}, validateInterval(): boolean {
		return true;
	}, validatePaymentType(): boolean {
		return true;
	}
};

export default succeedingValidator;
