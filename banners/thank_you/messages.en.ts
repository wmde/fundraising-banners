import { TranslationMessages } from '@src/Translator';
import DynamicCampaignTextEn from '@src/utils/DynamicContent/messages/DynamicCampaignText.en';

const messages: TranslationMessages = {
	...DynamicCampaignTextEn,
	'call-to-action-more-info': 'For more information, please visit our website',
	'call-to-action-button': 'Become a supporter now',
	'call-to-action-button-amount-per-month': 'Support with €{{amount}} per month',
	'call-to-action-button-different-amount': 'Support with a custom amount',
	'open-modal': 'Open thank you message',
	'close-modal': 'Close thank you message',
	'progress-bar-inner-text': 'Accomplished!',
	'progress-bar-inner-text-win': 'Accomplished!',
	'progress-bar-inner-text-lose': 'Failed',
	'image-copyright-holder': 'Annika Möller for Wikimedia Deutschland',
	'subscribe-title': 'Need more information about membership?',
	'subscribe-text': 'Simply enter your e-mail address',
	'subscribe-link': 'or visit our website',
	'subscribe-privacy': 'Privacy',
	'subscribe-button': 'Send',
	'subscribe-placeholder': 'E-Mail Address',
	'subscribe-form-error': 'Please enter a valid email address.',
	'stats-people-amount': '102.000',
	'stats-people-text': 'Fördermitglied bereits',
	'stats-average-amount': '55 €',
	'stats-average-text': 'durchschnittlicher Jahresbeitrag',
	'stats-contribution-amount': '2 €',
	'stats-contribution-text': 'Mindestbeitrag nur 2 €/Monat'
};

export default messages;
