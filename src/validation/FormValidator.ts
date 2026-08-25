export interface FormValidator {
	validate(): boolean;
	validateAmount(): boolean;
	validateInterval(): boolean;
	validatePaymentType(): boolean;
}
