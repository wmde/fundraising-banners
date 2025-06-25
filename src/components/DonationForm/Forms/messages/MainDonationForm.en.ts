import { TranslationMessages } from '@src/Translator';

const translations: TranslationMessages = {
	'intervals-header': 'I will donate:',
	'amounts-header': 'Amount:',
	'payments-header': 'Using:',

	'no-interval-message': 'How often would you like to donate?',
	'amount-empty-message': 'How much would you like to donate?',
	'amount-too-low-message': 'The donation needs to be at least 1 Euro.',
	'amount-too-high-message': 'The donation cannot be more than 99999 Euros',
	'no-payment-type-message': 'How would you like to pay your donation?',
	'anonymous-BEZ-info-message': 'We need your address for a debit payment.',
	'custom-amount-placeholder': 'Other amount',
	'custom-amount-placeholder-short': 'other',
	'submit-label-short': 'Proceed',
	'submit-label': 'Proceed with the donation',

	'submit-label-paypal': 'Proceed with PayPal',
	'submit-label-credit-card': 'Proceed with credit card',
	'submit-label-sofort': 'Proceed with Sofort-Überweisung',
	'submit-label-bank-transfer': 'Proceed with bank transfer',
	'submit-label-default': 'Proceed with the donation',
	'donation-receipt-checkbox-label': 'Please send me a tax deductible donation receipt to my postal address.',

	'interval-once': 'one-time',
	'interval-monthly': 'monthly',
	'interval-quarterly': 'quarterly',
	'interval-biannual': 'semi-yearly',
	'interval-yearly': 'yearly',

	'payment-direct-debit': 'Direct Debit',
	'payment-bank-transfer': 'Bank Transfer',
	'payment-credit-card': 'Credit Card',
	'payment-paypal': 'PayPal',
	'payment-sofort': 'Sofortüberweisung'
};

export default translations;
