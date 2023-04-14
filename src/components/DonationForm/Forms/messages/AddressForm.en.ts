import { TranslationMessages } from '@src/Translator';

const translations: TranslationMessages = {
	'address-type-label': 'Do you want to provide your address data?',
	'address-type-option-full': 'Full address data',
	'address-type-notice-full': 'You will receive a donation receipt by mail. You will also receive an e-mail confirmation of your donation.',
	'address-type-option-email': 'Only e-mail address',
	'address-type-notice-email': 'You waive the donation receipt, but receive an e-mail confirmation of your donation.',
	'address-type-option-none': 'No address data',
	'address-type-notice-none': 'You waive the donation receipt and an e-mail confirmation of your donation. We will not contact you when Wikipedia needs help again.',
	'address-type-notice-direct-debit': 'A postal address is necessary for donating by direct-debit.',
	'address-type-error-message': 'Please choose an option.',
	'submit-label-paypal': 'Proceed with PayPal',
	'submit-label-credit-card': 'Proceed with credit card',
	'submit-label-sofort': 'Proceed with Sofort-Überweisung',
	'submit-label-bank-transfer': 'Proceed with bank transfer',
	'submit-label-default': 'Proceed with the donation',
	'address-type-notice-disabled': 'A postal address is necessary for donating by direct-debit.',

	// the following 2 lines are only for the ipad var test, remove if not in use anymore
	'give-address-statement-positive': 'Yes',
	'give-address-statement-negative': 'No'
};

export default translations;
