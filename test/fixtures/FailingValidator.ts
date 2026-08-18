import type { FormValidator } from '@src/validation/FormValidator';

const failingValidator: FormValidator = {
	validate(): boolean {
		return false;
	}, validateAmount(): boolean {
		return false;
	}, validateInterval(): boolean {
		return false;
	}, validatePaymentMethod(): boolean {
		return false;
	}
};

export default failingValidator;
