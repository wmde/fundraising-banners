import DynamicCampaignTextDe from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import CloseButtonTextDe from '@src/components/ButtonClose/messages/ButtonClose.de';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearlyDe from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import SoftCloseDe from '@src/components/SoftClose/messages/SoftClose.de';
import FooterDe from '@src/components/Footer/messages/Footer.de';
import MainDonationFormDe from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';

const messages: TranslationMessages = {
	...DynamicCampaignTextDe,
	...CloseButtonTextDe,
	...UpgradeToYearlyDe,
	...SoftCloseDe,
	...FooterDe,
	...MainDonationFormDe,

	// custom messages here
	'address-type-notice-full': 'Nur so können wir Ihnen eine Spendenquittung per Post zusenden. Außerdem erhalten ' +
		'Sie eine Bestätigung per E-Mail.',
	'address-type-notice-none': 'Sie verzichten sowohl auf eine Spendenquittung als auch auf eine Bestätigung ' +
		'per E-Mail. Sie erhalten von uns keine Information, wenn Wikipedia wieder Hilfe braucht.',
	'soft-close-prompt': 'Wikipedia später unterstützen?',
	'soft-close-button-already-donated': 'Habe schon gespendet',
	'mini-banner-already-donated-button': 'Habe bereits gespendet',
	'upgrade-to-yearly-copy': '<p>Jedes Jahr sind wir auf die Unterstützung von Menschen wie Ihnen angewiesen.' +
		' Jährliche Spenden helfen uns nachhaltig und ermöglichen langfristige Weiterentwicklungen.</p>' +
		'<p>Sie gehen kein Risiko ein: Jederzeit formlos zu sofort kündbar.</p>',
	'payment-sofort': 'Sofort',
	'payment-bank-transfer': 'Überweisung',
	'upgrade-to-yearly-header': 'Bitte spenden Sie {{amount}} jährlich!',
};

export default messages;
