import { TranslationMessages } from '@src/Translator';

const translations: TranslationMessages = {
	'intervals-header': 'Häufigkeit wählen',
	'amounts-header': 'Betrag wählen',
	'payments-header': 'Zahlweise wählen',

	'no-interval-message': 'Bitte wählen Sie zuerst ein Zahlungsintervall.',
	'amount-empty-message': 'Bitte wählen Sie einen Betrag aus.',
	'amount-too-low-message': '1 € muss es mindestens sein.',
	'amount-too-high-message': 'Es darf nicht mehr als 99999 € sein.',
	'no-payment-type-message': 'Bitte wählen Sie eine Zahlungsweise aus.',
	'anonymous-BEZ-info-message': 'Für Lastschriften ist die Angabe einer Adresse erforderlich.',
	'sms-info-message': 'SMS mit "WIKI" an die 81190. Kosten zzgl. einer Standard-SMS.',
	'sms-payment-message': '5 € per SMS',
	'custom-amount-placeholder': 'Wunschbetrag',
	'custom-amount-placeholder-short': 'anderer',
	'submit-label-short': 'Weiter',
	'submit-label': 'Weiter, um Spende abzuschließen',

	'submit-label-paypal': 'Weiter zu PayPal',
	'submit-label-credit-card': 'Weiter zur Dateneingabe',
	'submit-label-sofort': 'Weiter zu Sofort',
	'submit-label-bank-transfer': 'Weiter zur Bankverbindung',
	'submit-label-default': 'Weiter zur Adresseingabe',
	'donation-receipt-checkbox-label': 'Bitte senden Sie mir eine steuerlich absetzbare Spendenbescheinigung an meine Postanschrift.',

	'interval-once': 'Einmalig',
	'interval-monthly': 'Monatlich',
	'interval-quarterly': 'Vierteljährlich',
	'interval-biannual': 'halbjährlich',
	'interval-yearly': 'Jährlich',

	'payment-direct-debit': 'Lastschrift',
	'payment-bank-transfer': 'Banküberweisung',
	'payment-credit-card': 'Kreditkarte',
	'payment-paypal': 'PayPal',
	'payment-sofort': 'Sofortüberweisung',
};

export default translations;
