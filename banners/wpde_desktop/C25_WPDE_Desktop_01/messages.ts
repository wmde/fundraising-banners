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
	'already-donated-link': 'Habe schon gespendet',
	'upgrade-to-yearly-copy': '<p>Jedes Jahr sind wir auf Menschen wie Sie angewiesen. Jährliche Spenden helfen uns' +
		' besonders und ermöglichen langfristige Weiterentwicklungen.</p>' +
		'<p>Sie gehen kein Risiko ein: Jederzeit formlos zu sofort kündbar.</p>',
};

export default messages;
