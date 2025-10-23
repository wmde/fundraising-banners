import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import CloseButtonTextDe from '@src/components/ButtonClose/messages/ButtonClose.de';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyDe from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import FooterDe from '@src/components/Footer/messages/Footer.de';
import MainDonationFormDe from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';
import SoftCloseDe from '@src/components/SoftClose/messages/SoftClose.de';

const messages: TranslationMessages = {
	...DynamicCampaignTextDe,
	...CloseButtonTextDe,
	...FooterDe,
	...MainDonationFormDe,
	...UpgradeToYearlyDe,
	...SoftCloseDe,

	// custom messages here
	'use-of-funds-link': 'Was Ihre Spende bewirkt',
	'payment-bank-transfer': 'Überweisung',
	'payment-sofort': 'Sofort',
	'upgrade-to-yearly-header': 'Bitte spenden Sie {{amount}} jährlich!',
	'upgrade-to-yearly-copy': '<p>Jedes Jahr sind wir auf Menschen wie Sie angewiesen. Jährliche Spenden helfen uns' +
		' besonders und ermöglichen langfristige Weiterentwicklungen.</p>' +
		'<p>Sie gehen kein Risiko ein: Jederzeit formlos zu sofort kündbar.</p>',
	'upgrade-to-yearly-no': 'Nein, ich spende einmalig {{amount}}',
	'upgrade-to-yearly-yes': 'Ja, ich spende {{amount}} jährlich',
	'campaign-day-only-n-days': 'Heute sind es nur noch {{days}} Tage bis zum Ende unserer Spendenkampagne.',
	'soft-close-prompt': 'Wikipedia später unterstützen?',
	'soft-close-button-already-donated': 'Habe schon gespendet',
	'mini-banner-already-donated-button': 'Habe bereits gespendet',
	'amount-total': '',
};

export default messages;
