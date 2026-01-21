import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import CloseButtonTextDe from '@src/components/ButtonClose/messages/ButtonClose.de';
import { TranslationMessages } from '@src/Translator';

const messages: TranslationMessages = {
	...DynamicCampaignTextDe,
	...CloseButtonTextDe,

	// custom messages here
	'banner-label': 'Spenden Sie an Wikimedia Deutschland',
	'custom-amount-placeholder': 'Andere',
	'yearly-label': 'Jährlich spenden',
	'required-error': 'Bitte zuerst Betrag auswählen',
	'use-of-funds-button': 'Warum spenden?',
	'already-donated-button': 'Habe bereits gespendet',
	'submit-button': 'Jetzt spenden',
	'submit-button-amount': 'Jetzt {{amount}} spenden',
	'previous-slide': 'vorherige Folie',
	'next-slide': 'nächste Folie',
	'slide-page': 'Folie {{page}} von {{total}}',
};

export default messages;
