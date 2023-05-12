import { TranslationMessages } from '@src/Translator';

const translations: TranslationMessages = {
	'address-type-label': 'Möchten Sie Ihre Kontaktdaten angeben?',
	'address-type-option-full': 'Vollständige Kontaktdaten',
	'address-type-option-email': 'Nur E-Mail-Adresse',
	'address-type-option-none': 'Gar keine Kontaktdaten',
	'address-type-notice-none': 'Sie verzichten sowohl auf eine Spendenquittung als auch auf eine Bestätigung ' +
		'per E-Mail. Sie erhalten von uns keine Information, wenn Wikipedia wieder Hilfe braucht.',
	'address-type-notice-full': 'Für Spendenquittung per Post und Bestätigung per E-Mail',
	'address-type-notice-email': 'Für Bestätigung per E-Mail',
	'address-type-notice-direct-debit': 'Für Lastschriften ist die Angabe einer Adresse erforderlich.',
	'address-type-error-message': 'Bitte wählen Sie aus, ob Sie Kontaktdaten angeben möchten.',
	'submit-label-paypal': 'Weiter zu PayPal',
	'submit-label-credit-card': 'Weiter zur Dateneingabe',
	'submit-label-sofort': 'Weiter zu Sofort',
	'submit-label-bank-transfer': 'Weiter zur Bankverbindung',
	'submit-label-short': 'Weiter',
	'submit-label-default': 'Weiter zur Adresseingabe',
	'address-type-notice-negative': 'Ihre Kontaktdaten benötigen wir für die Bestätigungsemail und Ihre Spendenquittung. ' +
		'Zudem können wir Sie auf Wunsch informieren, wenn Wikipedia in Zukunft Ihre Hilfe benötigt.',
	'address-type-notice-disabled': 'Für Lastschriften ist die Angabe einer Adresse erforderlich.',

	// the following lines are only for the ipad & desktop var test, remove if not in use anymore
	'give-address-statement-positive': 'Ja',
	'give-address-statement-negative': 'Nein'
};

export default translations;
