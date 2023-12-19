import { TranslationMessages } from '@src/Translator';
import DynamicCampaignTextEn from '@src/utils/DynamicContent/messages/DynamicCampaignText.en';

const messages: TranslationMessages = {
	...DynamicCampaignTextEn,
	'call-to-action-more-info': 'For more information, please visit our website',
	'call-to-action-button': 'Become a supporter now',
	'call-to-action-button-amount-per-month': 'Support with €{{amount}} per month',
	'call-to-action-button-different-amount': 'Support with a custom amount',
	'open-modal': 'Read our thank-you message',
	'close-modal': 'Close thank you message',
	'progress-bar-inner-text-win': 'We made it! 🎉 🥳',
	'progress-bar-inner-text-lose': 'We didn\'t make it 😭',
	'image-copyright-holder': 'Annika Möller for Wikimedia Deutschland',
	'subscribe-title': 'Need more information about membership?',
	'subscribe-text': 'Simply enter your e-mail address',
	'subscribe-link': 'or visit our website',
	'subscribe-privacy': 'Privacy',
	'subscribe-button': 'Send',
	'subscribe-placeholder': 'E-Mail Address',
	'subscribe-form-error': 'Please enter a valid email address.',
	'stats-people-amount': '102.000',
	'stats-people-text': 'existing supporting members',
	'stats-average-amount': '€5',
	'stats-average-text': 'average monthly membership fee',
	'stats-contribution-amount': '€2',
	'stats-contribution-text': 'monthly minimum contribution'
};

export default messages;
