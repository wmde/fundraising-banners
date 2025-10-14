import DynamicCampaignText from '@src/utils/DynamicContent/messages/DynamicCampaignText.de';
import CloseButtonTextDe from '@src/components/ButtonClose/messages/ButtonClose.de';
import { TranslationMessages } from '@src/Translator';
import UpgradeToYearly from '@src/components/DonationForm/Forms/messages/UpgradeToYearly.de';
import SoftClose from '@src/components/SoftClose/messages/SoftClose.de';
import Footer from '@src/components/Footer/messages/Footer.de';
import MainDonationForm from '@src/components/DonationForm/Forms/messages/MainDonationForm.de';

const messages: TranslationMessages = {
	...DynamicCampaignText,
	...CloseButtonTextDe,
	...UpgradeToYearly,
	...SoftClose,
	...Footer,
	...MainDonationForm,
	'soft-close-button-already-donated': 'Habe schon gespendet',
	'upgrade-to-yearly-copy': '<p>Jedes Jahr sind wir auf die Unterstützung von Menschen wie Ihnen angewiesen. ' +
		'Jährliche Spenden helfen uns nachhaltig und ermöglichen langfristige Weiterentwicklungen.</p>' +
		'<p>Sie gehen kein Risiko ein: Jederzeit formlos zu sofort kündbar.</p>',
	'upgrade-to-yearly-header': 'Bitte spenden Sie 5 € jährlich!'
};

export default messages;
