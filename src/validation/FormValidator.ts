export interface FormValidator {
	validate(): boolean;
	validateAmount(): boolean;
	validateInterval(): boolean;
	validatePaymentMethod(): boolean;
}
