import { TranslationMessages } from '@src/Translator';
import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';

const messages: TranslationMessages = {
	...DynamicCampaignTextDe,
	'call-to-action-more-info': 'Weitere Informationen auf unserer Webseite',
	'call-to-action-button-amount-per-month': 'Mit {{amount}} € im Monat fördern',
	'call-to-action-button-different-amount': 'Mit anderem Betrag fördern',
	'open-modal': 'Lesen Sie unsere Dankesbotschaft',
	'close-modal': 'Dankestext schließen',
	'progress-bar-inner-text-win': 'Geschafft!',
	'progress-bar-inner-text-lose': 'Dennoch: Spendenziel nicht erreicht',
	'image-copyright-holder': 'Annika Möller für Wikimedia Deutschland',
	'subscribe-title': 'Benötigen Sie weitere Informationen zur Mitgliedschaft?',
	'subscribe-text': 'Tragen Sie einfach Ihre E-Mail-Adresse ein',
	'subscribe-link': 'oder besuchen Sie unsere Webseite',
	'subscribe-privacy': 'Datenschutz',
	'subscribe-button': 'Senden',
	'subscribe-placeholder': 'E-Mail-Adresse',
	'subscribe-form-error': 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
	'stats-people-amount': '102.000',
	'stats-people-text': 'Fördermitglied bereits',
	'stats-average-amount': '55&nbsp;€',
	'stats-average-text': 'durchschnittlicher Jahresbeitrag',
	'stats-contribution-amount': '2&nbsp;€',
	'stats-contribution-text': 'Mindestbeitrag nur 2&nbsp;€/Monat'
};

export default messages;
