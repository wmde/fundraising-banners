import type { FormValidator } from '@src/validation/FormValidator';

const failingValidator: FormValidator = {
	validate(): boolean {
		return false;
	}, validateAmount(): boolean {
		return false;
	}, validateInterval(): boolean {
		return false;
	}, validatePaymentType(): boolean {
		return false;
	}
};

export default failingValidator;
