import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import CloseButtonTextDe from '@src/components/ButtonClose/messages/ButtonClose.de';
import { TranslationMessages } from '@src/Translator';

const messages: TranslationMessages = {
	...DynamicCampaignTextDe,
	...CloseButtonTextDe,

	// custom messages here
	'custom-amount-placeholder': 'Andere',
	'yearly-label': 'Jährlich spenden',
	'required-error': 'Wähle deinen Beitrag aus.',
	'use-of-funds-button': 'Was Ihre Spende bewirkt',
	'already-donated-button': 'Habe bereits gespendet',
	'submit-button': 'Jetzt spenden',
	'submit-button-amount': 'Jetzt {{amount}} spenden',
};

export default messages;
